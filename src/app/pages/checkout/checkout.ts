import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class Checkout implements OnInit {
  checkoutForm: FormGroup;
  carrito: any[] = [];
  ordenGenerada = false;
  numeroOrden = '';
  enviando = false;
  errorMensaje: string = '';
  correoEnviado: boolean = false;

  // Reemplaza con tus credenciales reales
  private readonly EMAILJS_SERVICE_ID = 'service_2fr5txq'; // Service ID
  private readonly EMAILJS_TEMPLATE_ID = 'template_5by5i1g'; // Template ID
  private readonly EMAILJS_PUBLIC_KEY = 'YCQ64s6zxx8vf8MQd'; // Public Key

  constructor(
    private fb: FormBuilder,
    private carritoService: CarritoService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      telefono: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]],
      tarjeta: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{16}$/),
        Validators.minLength(16),
        Validators.maxLength(16)
      ]]
    });
  }

  ngOnInit(): void {
    emailjs.init(this.EMAILJS_PUBLIC_KEY);
    this.carritoService.carrito$.subscribe(carrito => {
      this.carrito = carrito;
    });
  }

  get subtotal(): number {
    return this.carritoService.getTotal();
  }

  get descuento(): number {
    const subtotal = this.subtotal;
    if (subtotal >= 5000) return subtotal * 0.20;
    if (subtotal >= 3000) return subtotal * 0.15;
    if (subtotal >= 1000) return subtotal * 0.10;
    return 0;
  }

  get envio(): number {
    return this.subtotal > 1000 ? 0 : 50;
  }

  get impuestos(): number {
    return (this.subtotal - this.descuento) * 0.18;
  }

  get total(): number {
    return this.subtotal - this.descuento + this.envio + this.impuestos;
  }

  get f() { return this.checkoutForm.controls; }

  private generarIDOrden(): string {
    const fecha = new Date();
    const year = fecha.getFullYear().toString().slice(-2);
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ORD-${year}${month}${day}-${random}`;
  }

  private async enviarCorreo(datos: any): Promise<boolean> {
    try {
      // Preparar los productos en el formato que espera el template
      const orders = datos.productos.map((p: any) => ({
        image_url: p.imagen || 'https://picsum.photos/seed/default/64/64',
        name: p.nombre,
        units: p.cantidad,
        price: p.precio
      }));

      const response = await emailjs.send(
        this.EMAILJS_SERVICE_ID,
        this.EMAILJS_TEMPLATE_ID,
        {
          order_id: datos.orden_id,
          orders: orders,
          cost: {
            shipping: datos.envio.toFixed(2),
            tax: datos.impuestos.toFixed(2),
            total: datos.total.toFixed(2)
          },
          email: datos.email
        }
      );

      console.log('Correo enviado exitosamente:', response);
      return true;
    } catch (error) {
      console.error('Error al enviar correo:', error);
      return false;
    }
  }

  async onSubmit(): Promise<void> {
    this.errorMensaje = '';
    this.correoEnviado = false;

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    if (this.carrito.length === 0) {
      this.errorMensaje = 'El carrito está vacío';
      return;
    }

    this.enviando = true;

    try {
      const ordenId = this.generarIDOrden();

      const datosCompra = {
        orden_id: ordenId,
        nombre: this.checkoutForm.value.nombre,
        email: this.checkoutForm.value.email,
        direccion: this.checkoutForm.value.direccion,
        telefono: this.checkoutForm.value.telefono,
        productos: this.carrito.map(item => ({
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: (item.precio * item.cantidad).toFixed(2),
          imagen: item.imagen || 'https://picsum.photos/seed/default/64/64'
        })),
        subtotal: this.subtotal,
        descuento: this.descuento,
        envio: this.envio,
        impuestos: this.impuestos,
        total: this.total
      };

      // Mostrar confirmación inmediatamente
      this.numeroOrden = ordenId;
      this.ordenGenerada = true;
      this.enviando = false;

      // Guardar historial
      const historial = JSON.parse(localStorage.getItem('historial_compras') || '[]');
      historial.push({
        ...datosCompra,
        fecha: new Date().toISOString()
      });
      localStorage.setItem('historial_compras', JSON.stringify(historial));

      // Vaciar carrito
      this.carritoService.vaciarCarrito();

      // Enviar correo en segundo plano
      this.enviarCorreo(datosCompra).then((ok) => {
        this.correoEnviado = ok;
      });

      // Redirigir después de 6 segundos
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 6000);

    } catch (error: any) {
      console.error('Error en el proceso de compra:', error);
      this.errorMensaje = 'Hubo un error al procesar tu compra. Intenta de nuevo.';
      this.enviando = false;
    }
  }
}
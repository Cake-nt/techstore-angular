import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito implements OnInit, OnDestroy {
  carrito: any[] = [];
  subtotal: number = 0;
  descuento: number = 0;
  envio: number = 0;
  impuestos: number = 0;
  total: number = 0;
  private subscription!: Subscription;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.subscription = this.carritoService.carrito$.subscribe(carrito => {
      this.carrito = carrito;
      this.calcularTotales();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Función para redondear a 2 decimales
  private redondear(valor: number): number {
    return Math.round(valor * 100) / 100;
  }

  calcularTotales(): void {
    // Calcular subtotal
    this.subtotal = this.redondear(
      this.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
    );

    // Calcular descuento basado en subtotal
    if (this.subtotal >= 5000) {
      this.descuento = this.redondear(this.subtotal * 0.20);
    } else if (this.subtotal >= 3000) {
      this.descuento = this.redondear(this.subtotal * 0.15);
    } else if (this.subtotal >= 1000) {
      this.descuento = this.redondear(this.subtotal * 0.10);
    } else {
      this.descuento = 0;
    }

    // Calcular envío
    this.envio = this.subtotal > 1000 ? 0 : 50;

    // Calcular impuestos (18% sobre el subtotal menos descuento)
    this.impuestos = this.redondear((this.subtotal - this.descuento) * 0.18);

    // Calcular total final
    this.total = this.redondear(this.subtotal - this.descuento + this.envio + this.impuestos);
  }

  actualizarCantidad(id: number, cantidad: number): void {
    this.carritoService.actualizarCantidad(id, cantidad);
  }

  eliminarProducto(id: number): void {
    this.carritoService.eliminarProducto(id);
  }

  vaciarCarrito(): void {
    if (confirm('¿Seguro que quieres vaciar el carrito?')) {
      this.carritoService.vaciarCarrito();
    }
  }
}
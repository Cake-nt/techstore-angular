import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {
  @Input() producto!: Producto;
  @Output() agregado = new EventEmitter<Producto>();

  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(): void {
    console.log('🛒 Agregando producto:', this.producto.nombre);
    this.carritoService.agregarProducto(this.producto);
    this.agregado.emit(this.producto);
    //  Mostrar notificación simple
    alert(`✅ ${this.producto.nombre} agregado al carrito`);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './detalle-producto.html',
  styleUrls: ['./detalle-producto.css']
})
export class DetalleProducto implements OnInit {
  producto!: Producto;
  cantidad: number = 1;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('🔍 Buscando producto con ID:', id);
    
    // 🔥 Buscar el producto en los productos de fallback
    const productos = this.getProductosFallback();
    const encontrado = productos.find(p => p.id === id);
    
    if (encontrado) {
      this.producto = encontrado;
      console.log('✅ Producto encontrado:', this.producto.nombre);
    } else {
      console.error('❌ Producto no encontrado');
      // Producto por defecto si no se encuentra
      this.producto = productos[0];
    }
    this.loading = false;
  }

  incrementarCantidad(): void {
    if (this.producto && this.cantidad < this.producto.stock) {
      this.cantidad++;
    }
  }

  decrementarCantidad(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  agregarAlCarrito(): void {
    this.carritoService.agregarProducto(this.producto, this.cantidad);
  }

  private getProductosFallback(): Producto[] {
    return [
      { id: 1, nombre: 'Laptop Gamer ASUS ROG', descripcion: 'Intel Core i7, 16GB RAM, RTX 3060', precio: 999, precioOriginal: 1299, categoria: 'laptops', marca: 'asus', stock: 12, descuento: 20, rating: 4.8, reseñas: 120, imagen: 'https://picsum.photos/seed/laptop1/300/200' },
      { id: 2, nombre: 'iPhone 15 Pro Max', descripcion: '128GB, Cámara 48MP, Titanio', precio: 1019, precioOriginal: 1199, categoria: 'smartphones', marca: 'apple', stock: 8, descuento: 15, rating: 4.9, reseñas: 85, imagen: 'https://picsum.photos/seed/iphone1/300/200' },
      { id: 3, nombre: 'Audífonos Sony WH-1000XM5', descripcion: 'Cancelación de ruido, 30h batería', precio: 359, precioOriginal: 399, categoria: 'audio', marca: 'sony', stock: 15, descuento: 10, rating: 4.7, reseñas: 64, imagen: 'https://picsum.photos/seed/headphones1/300/200' },
      { id: 4, nombre: 'Monitor Samsung Odyssey G9', descripcion: '49" 240Hz, Curvo, QLED', precio: 1499, precioOriginal: 0, categoria: 'gaming', marca: 'samsung', stock: 5, descuento: 0, rating: 4.6, reseñas: 42, imagen: 'https://picsum.photos/seed/monitor1/300/200' },
      { id: 5, nombre: 'Tablet Samsung Galaxy Tab S9', descripcion: '14.6", 256GB, S Pen', precio: 999, precioOriginal: 0, categoria: 'accesorios', marca: 'samsung', stock: 10, descuento: 0, rating: 4.8, reseñas: 53, imagen: 'https://picsum.photos/seed/tablet1/300/200' },
      { id: 6, nombre: 'Teclado Mecánico Gamer RGB', descripcion: 'Cherry MX Red, RGB, 60%', precio: 89, precioOriginal: 120, categoria: 'gaming', marca: 'lenovo', stock: 20, descuento: 25, rating: 4.5, reseñas: 98, imagen: 'https://picsum.photos/seed/keyboard1/300/200' },
      { id: 7, nombre: 'Apple Watch Series 9', descripcion: 'GPS, 45mm, Siempre activa', precio: 429, precioOriginal: 0, categoria: 'accesorios', marca: 'apple', stock: 7, descuento: 0, rating: 4.7, reseñas: 71, imagen: 'https://picsum.photos/seed/watch1/300/200' },
      { id: 8, nombre: 'Cámara Sony Alpha A7 IV', descripcion: '33MP, 4K 60fps, Sin espejo', precio: 2499, precioOriginal: 0, categoria: 'accesorios', marca: 'sony', stock: 3, descuento: 0, rating: 4.9, reseñas: 36, imagen: 'https://picsum.photos/seed/camera1/300/200' }
    ];
  }
}
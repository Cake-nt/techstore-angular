import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCard],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categorias: string[] = ['todos', 'laptops', 'smartphones', 'accesorios', 'gaming', 'audio'];
  categoriaSeleccionada: string = 'todos';
  precioMaximo: number = 3000;
  busqueda: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productos = this.getProductosFallback();

    // Leer el parámetro de la URL al iniciar
    this.route.queryParams.subscribe(params => {
      const categoria = params['categoria'];
      if (categoria && this.categorias.includes(categoria)) {
        this.categoriaSeleccionada = categoria;
      } else {
        this.categoriaSeleccionada = 'todos';
      }
      this.aplicarFiltros();
    });
  }

  onProductoAgregado(producto: Producto): void {
    console.log('Producto agregado desde Productos:', producto.nombre);
  }

  cambiarCategoria(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    // Actualizar la URL con el parámetro
    this.router.navigate(['/products'], {
      queryParams: { categoria: categoria === 'todos' ? null : categoria },
      queryParamsHandling: 'merge'
    });
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.productosFiltrados = this.productos.filter(p => {
      const cumpleCategoria = this.categoriaSeleccionada === 'todos' || 
                              p.categoria === this.categoriaSeleccionada;
      const cumplePrecio = p.precio <= this.precioMaximo;
      const cumpleBusqueda = this.busqueda === '' || 
                             p.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
                             p.descripcion.toLowerCase().includes(this.busqueda.toLowerCase());
      return cumpleCategoria && cumplePrecio && cumpleBusqueda;
    });
  }

  resetearFiltros(): void {
    this.categoriaSeleccionada = 'todos';
    this.precioMaximo = 3000;
    this.busqueda = '';
    this.router.navigate(['/products'], {
      queryParams: { categoria: null },
      queryParamsHandling: 'merge'
    });
    this.aplicarFiltros();
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
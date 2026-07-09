import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto';

interface CarritoItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<CarritoItem[]>([]);
  carrito$ = this.carritoSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.cargarCarrito();
  }

  agregarProducto(producto: Producto, cantidad: number = 1): void {
    const carrito = this.carritoSubject.value;
    const existente = carrito.find(item => item.id === producto.id);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad,
        imagen: producto.imagen
      });
    }

    this.actualizarCarrito([...carrito]);
  }

  eliminarProducto(id: number): void {
    const carrito = this.carritoSubject.value.filter(item => item.id !== id);
    this.actualizarCarrito([...carrito]);
  }

  actualizarCantidad(id: number, cantidad: number): void {
    const carrito = this.carritoSubject.value;
    const item = carrito.find(i => i.id === id);
    if (item) {
      item.cantidad = Math.max(1, cantidad);
      this.actualizarCarrito([...carrito]);
    }
  }

  vaciarCarrito(): void {
    this.actualizarCarrito([]);
  }

  getTotal(): number {
    return this.carritoSubject.value.reduce(
      (sum, item) => sum + (item.precio * item.cantidad), 0
    );
  }

  getCantidadTotal(): number {
    return this.carritoSubject.value.reduce(
      (sum, item) => sum + item.cantidad, 0
    );
  }

  getCarrito(): CarritoItem[] {
    return this.carritoSubject.value;
  }

  private actualizarCarrito(carrito: CarritoItem[]): void {
    this.carritoSubject.next(carrito);
    if (this.isBrowser) {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }

  private cargarCarrito(): void {
    if (this.isBrowser) {
      const guardado = localStorage.getItem('carrito');
      if (guardado) {
        try {
          const carrito = JSON.parse(guardado);
          this.carritoSubject.next(carrito);
        } catch (e) {
          console.error('Error al cargar carrito:', e);
        }
      }
    }
  }
}
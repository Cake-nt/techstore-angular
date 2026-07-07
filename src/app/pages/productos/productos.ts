import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos {
  productos = [
    { id: 1, nombre: 'Laptop Gamer ASUS ROG', precio: 999 },
    { id: 2, nombre: 'iPhone 15 Pro Max', precio: 1019 },
    { id: 3, nombre: 'Audífonos Sony WH-1000XM5', precio: 359 }
  ];
}
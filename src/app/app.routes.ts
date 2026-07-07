import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { Producto } from './pages/producto/producto';
import { Carrito } from './pages/carrito/carrito';
import { Contacto } from './pages/contacto/contacto';
import { Acerca } from './pages/acerca/acerca';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'productos', component: Productos },
    { path: 'producto/:id', component: Producto },
    { path: 'carrito', component: Carrito },
    { path: 'contacto', component: Contacto },
    { path: 'acerca', component: Acerca },
    { path: '**', redirectTo: '' }
];
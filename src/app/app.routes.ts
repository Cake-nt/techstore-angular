import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { DetalleProducto } from './pages/detalle-producto/detalle-producto';
import { Carrito } from './pages/carrito/carrito';
import { Checkout } from './pages/checkout/checkout';
import { Contacto } from './pages/contacto/contacto';
import { Acerca } from './pages/acerca/acerca';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'products', component: Productos },
    { path: 'producto/:id', component: DetalleProducto },
    { path: 'carrito', component: Carrito },
    { path: 'checkout', component: Checkout },
    { path: 'contacto', component: Contacto },
    { path: 'acerca', component: Acerca },
    { path: '**', component: NotFound }
];
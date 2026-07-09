import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';
import { Producto } from '../models/producto';

// 🔥 Interfaz para la respuesta de la API (en inglés)
interface FakeStoreProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private apiUrl = 'https://fakestoreapi.com/products';
    private productosSubject = new BehaviorSubject<Producto[]>([]);
    productos$ = this.productosSubject.asObservable();

    constructor(private http: HttpClient) {}

    obtenerProductos(): Observable<Producto[]> {
        return this.http.get<FakeStoreProduct[]>(this.apiUrl).pipe(
            map((productos: FakeStoreProduct[]) => 
                productos.map((p: FakeStoreProduct) => ({
                    id: p.id,
                    nombre: p.title,                              // ✅ title → nombre
                    descripcion: p.description,                   // ✅ description → descripcion
                    precio: p.price,                              // ✅ price → precio
                    precioOriginal: Math.round(p.price * 1.2),
                    categoria: p.category,                        // ✅ category → categoria
                    marca: 'Generic',
                    stock: Math.floor(Math.random() * 20) + 1,
                    descuento: Math.random() > 0.5 ? Math.floor(Math.random() * 25) + 5 : 0,
                    rating: p.rating?.rate || 4.5,                // ✅ rating.rate → rating
                    reseñas: p.rating?.count || Math.floor(Math.random() * 100) + 10,
                    imagen: p.image                               // ✅ image → imagen
                }))
            ),
            tap((productos: Producto[]) => this.productosSubject.next(productos))
        );
    }

    obtenerProducto(id: number): Observable<Producto> {
        return this.http.get<FakeStoreProduct>(`${this.apiUrl}/${id}`).pipe(
            map((p: FakeStoreProduct) => ({
                id: p.id,
                nombre: p.title,
                descripcion: p.description,
                precio: p.price,
                precioOriginal: Math.round(p.price * 1.2),
                categoria: p.category,
                marca: 'Generic',
                stock: Math.floor(Math.random() * 20) + 1,
                descuento: Math.random() > 0.5 ? Math.floor(Math.random() * 25) + 5 : 0,
                rating: p.rating?.rate || 4.5,
                reseñas: p.rating?.count || Math.floor(Math.random() * 100) + 10,
                imagen: p.image
            }))
        );
    }
}
export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    precioOriginal?: number;
    categoria: string;
    marca: string;
    stock: number;
    descuento?: number;
    rating: number;
    reseñas: number;
    imagen: string;
}
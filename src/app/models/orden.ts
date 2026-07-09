import { Cliente } from './cliente';

export interface Orden {
    id: string;
    cliente: Cliente;
    productos: any[];
    subtotal: number;
    descuento: number;
    envio: number;
    impuestos: number;
    total: number;
    fecha: Date;
    estado: 'pendiente' | 'completada' | 'cancelada';
}
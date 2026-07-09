import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acerca',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acerca.html',
  styleUrls: ['./acerca.css']
})
export class Acerca {
  equipo = [
    { nombre: 'Ana Martínez', cargo: 'CEO & Fundadora', experiencia: '+10 años en tecnología' },
    { nombre: 'Luis García', cargo: 'CTO', experiencia: 'Experto en IA y desarrollo' },
    { nombre: 'Sofía Reyes', cargo: 'Directora de Marketing', experiencia: 'Marketing digital y CM' }
  ];

  valores = [
    { titulo: 'Calidad', descripcion: 'Seleccionamos solo productos de las mejores marcas' },
    { titulo: 'Confianza', descripcion: 'Transparencia y honestidad con nuestros clientes' },
    { titulo: 'Innovación', descripcion: 'Siempre a la vanguardia de la tecnología' },
    { titulo: 'Pasión', descripcion: 'Amamos la tecnología y se refleja en cada interacción' }
  ];
}
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css']
})
export class SearchBar {
  termino: string = '';
  @Output() busqueda = new EventEmitter<string>();

  buscar(event: Event): void {
    event.preventDefault();
    this.busqueda.emit(this.termino);
  }
}
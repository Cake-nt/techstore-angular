import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkSubject = new BehaviorSubject<boolean>(false);
  isDark$ = this.isDarkSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.cargarTema();
  }

  toggleTheme(): void {
    const nuevoEstado = !this.isDarkSubject.value;
    this.isDarkSubject.next(nuevoEstado);
    if (this.isBrowser) {
      localStorage.setItem('theme', nuevoEstado ? 'dark' : 'light');
      document.body.classList.toggle('dark-theme', nuevoEstado);
    }
  }

  private cargarTema(): void {
    if (this.isBrowser) {
      const guardado = localStorage.getItem('theme');
      const esOscuro = guardado === 'dark';
      this.isDarkSubject.next(esOscuro);
      document.body.classList.toggle('dark-theme', esOscuro);
    }
  }
}
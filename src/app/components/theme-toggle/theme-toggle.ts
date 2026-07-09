import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="btn btn-outline-light btn-sm rounded-circle" 
            (click)="toggleTheme()" 
            style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;"
            [attr.aria-label]="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'">
      <i [class]="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
    </button>
  `,
  styles: [`
    .btn {
      transition: all 0.3s;
      border-color: rgba(255,255,255,0.2);
    }
    .btn:hover {
      background: rgba(255,255,255,0.15);
      border-color: rgba(255,255,255,0.4);
    }
  `]
})
export class ThemeToggle implements OnInit {
  isDark: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.isDark$.subscribe(dark => {
      this.isDark = dark;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, ThemeToggle],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit, OnDestroy {
  cantidadTotal: number = 0;
  private subscription!: Subscription;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.subscription = this.carritoService.carrito$.subscribe(carrito => {
      this.cantidadTotal = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
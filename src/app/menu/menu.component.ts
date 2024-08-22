import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutes } from '../app.routes';
import { RouterModule } from '@angular/router';
import { CardStatsComponent } from '../card-stats/card-stats.component';
import { HeaderStatsComponent } from "../header-stats/header-stats.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardStatsComponent,
    HeaderStatsComponent,
  ], // Ajoutez les imports ici
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  collapseShow = 'hidden';
  constructor() {}

  ngOnInit() {}
  toggleCollapseShow() {
    this.collapseShow = this.collapseShow === 'hidden' ? 'block' : 'hidden';
  }
}

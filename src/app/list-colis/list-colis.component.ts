import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColisService } from '../services/colis.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderStatsComponent } from '../header-stats/header-stats.component';
import { CommonModule } from '@angular/common';
import { Colis } from '../model/Colis';

@Component({
  selector: 'app-list-colis',
  standalone: true,
  imports: [HttpClientModule, HeaderStatsComponent, CommonModule],
  providers: [ColisService],
  templateUrl: './list-colis.component.html',
  styleUrls: ['./list-colis.component.css'],
})
export class ListColisComponent implements OnInit {
  colisList: Colis[] = [];
  filteredColisList: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages!: number;

  // Statistiques
  totalColis!: number;
  colisLivres!: number;
  colisRetards!: number;

  constructor(private colisService: ColisService, private router: Router) {}

  ngOnInit(): void {
    this.loadColis();
  }

  loadColis() {
    this.colisService.getColisList().subscribe(
      (data) => {
        this.colisList = data;
        this.filteredColisList = this.colisList;
        this.totalPages = Math.ceil(
          this.filteredColisList.length / this.itemsPerPage
        );

        // Calculer les statistiques
        this.totalColis = this.colisList.length;
        this.colisLivres = this.colisList.filter(
          (colis) => colis.statusColis === 'LIVRÉ'
        ).length;
        console.error(this.colisLivres);
        this.colisList.forEach((colis) => {
          console.log('Status:', colis.statusColis);
        });
        this.colisRetards = this.colisList.filter((colis) => {
          // Exemple de calcul pour les colis en retard
          const dateEstimeeArrivee = new Date(colis.dateEstimeeArrivee);
          const dateActuelle = new Date();
          return (
            dateEstimeeArrivee < dateActuelle && colis.statusColis !== 'LIVRÉ'
          );
        }).length;
      },
      (error) => {
        console.error('Erreur lors du chargement des colis', error);
      }
    );
  }
  getFullNameEmploye(colis: Colis): string {
    return `${colis.nomEmploye} ${colis.prenomEmploye}`;
  }

  getFullNameProprietaire(colis: Colis): string {
    return `${colis.nomProprietaire} ${colis.prenomProprietaire}`;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.filteredColisList = this.colisList.filter((colis) =>
      Object.values(colis).some((val) =>
        String(val).toLowerCase().includes(filterValue)
      )
    );
    this.totalPages = Math.ceil(
      this.filteredColisList.length / this.itemsPerPage
    );
    this.currentPage = 1;
  }

  editColis(colis: any) {
    this.router.navigate(['/edit-colis', colis.id]);
  }

  getPaginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredColisList.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}

import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColisService } from '../services/colis.service';
import { Colis } from '../model/Colis';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-colis',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  providers: [ColisService],
  templateUrl: './edit-colis.component.html',
  styleUrls: ['./edit-colis.component.css'],
})
export class EditColisComponent implements OnInit {
  colisForm: FormGroup;
  colisId!: number;

  constructor(
    private route: ActivatedRoute,
    private colisService: ColisService,
    private fb: FormBuilder
  ) {
    this.colisForm = this.fb.group({
      dateEnregistrement: ['', Validators.required],
      numeroTalonMco: ['', Validators.required],
      numeroLta: ['', Validators.required],
      nomNatureProduit: ['', Validators.required],
      dateEnvoi: ['', Validators.required],
      dateEstimeeArrivee: ['', Validators.required],
      departArrivee: ['', Validators.required],
      coutTransport: ['', Validators.required],
      nomProprietaire: ['', Validators.required],
      numeroTelephone1: ['', Validators.required],
      statusColis: ['', Validators.required],
    });
  }

  /**
   * Formate une chaîne de caractères de date au format 'yyyy-MM-dd'.
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  /**
   * Sauvegarde les modifications apportées au colis.
   */
  saveChanges() {
    if (this.colisForm.valid) {
      const updatedColis = { id: this.colisId, ...this.colisForm.value };
      this.colisService.updateColis(updatedColis).subscribe(
        () => {
          console.log('Colis mis à jour avec succès');
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du colis', error);
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }

  /**
   * Charge les informations du colis pour édition.
   */
  loadColis() {
    this.colisService.getColisList().subscribe(
      (data: Colis[]) => {
        const colis = data.find((c) => c.id === this.colisId);
        if (colis) {
          // Patch the form with formatted dates without altering the original colis object
          this.colisForm.patchValue({
            ...colis,
            dateEnregistrement: this.formatDate(
              colis.dateEnregistrement.toString()
            ),
            dateEnvoi: this.formatDate(colis.dateEnvoi.toString()),
            dateEstimeeArrivee: this.formatDate(
              colis.dateEstimeeArrivee.toString()
            ),
          })
          /* if(!colis.statusColis){
            colis.statusColis="NON LIVRÉ";
          }; */
        } else {
          console.error('Colis non trouvé');
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des colis', error);
      }
    );
  }

  ngOnInit(): void {
    this.colisId = +this.route.snapshot.paramMap.get('id')!;
    this.loadColis();
  }
}

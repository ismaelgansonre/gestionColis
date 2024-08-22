import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Colis } from '../model/Colis';
import { ColisService } from '../services/colis.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-colis',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [ColisService],
  templateUrl: './add-colis.component.html',
  styleUrls: ['./add-colis.component.css'],
})
export class AddColisComponent implements OnInit {
  colisForm!: FormGroup;

  constructor(private fb: FormBuilder, private colisService: ColisService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    /* this.colisForm = this.fb.group({
      dateEnregistrement: [this.getCurrentDate(), Validators.required],
      nomPrenomEmploye: ['', Validators.required],
      numeroTalonMco: ['', Validators.required],
      numeroLta: ['', Validators.required],
      nomNatureProduit: ['', Validators.required],
      poidsProduit: ['', [Validators.required, Validators.min(0.1)]],
      dateEnvoi: ['', Validators.required],
      dateEstimeeArrivee: ['', Validators.required],
      departArrivee: ['Chine-Burkina', Validators.required],
      coutTransport: ['', [Validators.required, Validators.min(0)]],
      nomProprietaire: ['', Validators.required],
      numeroCnibPassport: ['', Validators.required],
      numeroTelephone1: ['', Validators.required],
      numeroTelephone2: [''], // Optionnel
      email: ['', [Validators.required, Validators.email]],
      statusColis: ['NON LIVRÉ', Validators.required],
    }); */
    this.colisForm = this.fb.group({
      dateEnregistrement: [this.getCurrentDate(), Validators.required],
      nomPrenomEmploye: ['', Validators.required],
      numeroTalonMco: ['', Validators.required],
      numeroLta: ['', Validators.required],
      nomNatureProduit: ['', Validators.required],
      poidsProduit: [0.5, [Validators.required, Validators.min(0.1)]], // Valeur par défaut
      dateEnvoi: [this.getCurrentDate(), Validators.required], // Ajout de valeur par défaut
      dateEstimeeArrivee: [this.getCurrentDate(), Validators.required], // Ajout de valeur par défaut
      departArrivee: ['Chine-Burkina', Validators.required],
      coutTransport: [1000, [Validators.required, Validators.min(0)]], // Valeur par défaut
      nomProprietaire: ['Nom Proprio', Validators.required], // Valeur par défaut
      numeroCnibPassport: ['ABC123', Validators.required], // Valeur par défaut
      numeroTelephone1: ['1234567890', Validators.required], // Valeur par défaut
      numeroTelephone2: [''],
      email: ['example@example.com', [Validators.required, Validators.email]], // Valeur par défaut
      statusColis: ['NON LIVRÉ', Validators.required],
    });
  }

  private getCurrentDate(): string {
    return new Date().toISOString().slice(0, 10);
  }

  onSubmit(): void {
    if (this.colisForm.valid) {
      const formValues = this.colisForm.value;

      // Séparer le nom et le prénom de l'employé
      const [nomEmploye, prenomEmploye] =
        formValues.nomPrenomEmploye.split(' ');

      // Séparer le nom et le prénom du propriétaire
      const [nomProprietaire, prenomProprietaire] =
        formValues.nomProprietaire.split(' ');

      // Construire l'objet Colis
      const colis: Colis = {
        ...formValues,
        nomEmploye,
        prenomEmploye,
        nomProprietaire,
        prenomProprietaire,
      };

      // Appel du service pour sauvegarder les données
      this.colisService.addColis(colis).subscribe(
        (response) => {
          console.log('Colis ajouté avec succès', response);
        },
        (error) => {
          console.error("Erreur lors de l'ajout du colis", error);
        }
      );
    } else {
      console.log('Formulaire invalide');
      this.markFormFieldsTouched();
    }
  }

  private markFormFieldsTouched(): void {
    Object.keys(this.colisForm.controls).forEach((field) => {
      const control = this.colisForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }



  private displayValidationErrors(): void {
    Object.keys(this.colisForm.controls).forEach((field) => {
      const control = this.colisForm.get(field);
      if (control && control.invalid) {
        console.log(
          `Erreur de validation dans le champ ${field}:`,
          control.errors
        );
      }
    });
  }
}

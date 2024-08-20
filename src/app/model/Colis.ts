export interface Colis {
  id?: number; // Optional as it's auto-incremented
  dateEnregistrement: Date;
  nomEmploye: string;
  prenomEmploye: string;
  numeroTalonMco: string;
  numeroLta: string;
  nomNatureProduit: string;
  poidsProduit: number;
  dateEnvoi: Date;
  dateEstimeeArrivee: Date;
  departArrivee: string;
  coutTransport: number;
  nomProprietaire: string;
  prenomProprietaire: string;
  numeroCnibPassport: string;
  numeroTelephone1: string;
  numeroTelephone2?: string; // Optional because it might be null
  email: string;
  statusColis: 'LIVRÉ' | 'NON LIVRÉ';
}

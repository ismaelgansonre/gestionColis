import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login(email: string, password: string): boolean {
    // Implémentez votre logique de connexion ici
    // Par exemple, vérifier l'email et le mot de passe contre une API
    if (email === 'user@example.com' && password === 'password') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

/**
 * Page de connexion.
 *
 * FORMULAIRES RÉACTIFS (Reactive Forms) :
 * ─────────────────────────────────────────
 * Angular propose deux approches pour les formulaires :
 *
 * 1. Template-driven (ngModel) : logique dans le HTML — simple mais limité
 * 2. Reactive Forms            : logique dans le TypeScript — plus puissant
 *
 * On utilise les Reactive Forms car :
 * - Validation centralisée et testable
 * - Plus facile à gérer les erreurs
 * - Meilleure séparation logique/template
 *
 * FLUX :
 * ───────
 * 1. FormBuilder crée un FormGroup avec des validateurs
 * 2. Le template HTML est lié au formulaire avec [formGroup] et formControlName
 * 3. À la soumission, on appelle authService.login()
 * 4. Si succès → redirection selon le rôle
 * 5. Si échec → message d'erreur affiché
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  /** Le formulaire réactif avec ses contrôles et validateurs */
  loginForm: FormGroup;

  /** true pendant l'appel API (pour désactiver le bouton et afficher un spinner) */
  isLoading = false;

  /** Message d'erreur à afficher si la connexion échoue */
  errorMessage = '';

  /** Contrôle l'affichage du mot de passe (visible/masqué) */
  showPassword = false;

  constructor(
    private fb: FormBuilder,      // Service Angular pour créer des formulaires
    private authService: AuthService,
    private router: Router
  ) {
    // Création du formulaire avec deux champs et leurs validateurs
    this.loginForm = this.fb.group({
      email: [
        '',                              // Valeur initiale
        [Validators.required, Validators.email]  // Validateurs
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(3)]
      ]
    });
  }

  /**
   * Raccourcis pour accéder aux contrôles dans le template.
   * Évite d'écrire loginForm.get('email') à chaque fois.
   */
  get emailControl() { return this.loginForm.get('email')!; }
  get passwordControl() { return this.loginForm.get('password')!; }

  /**
   * Soumission du formulaire.
   *
   * this.loginForm.valid → true si tous les validateurs passent.
   * On vérifie cela avant d'appeler l'API pour éviter des requêtes inutiles.
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      // Marque tous les champs comme "touched" pour afficher les erreurs
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Appel au service d'authentification
    // .subscribe() permet de réagir au résultat de l'Observable
    this.authService.login(this.loginForm.value).subscribe({
      // Succès
      next: (response) => {
        this.isLoading = false;
        // Redirection selon le rôle
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/books']);
        }
      },
      // Erreur
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect.';
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
      }
    });
  }

  /** Bascule la visibilité du mot de passe */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { UserSession } from '../../models/auth.model';

/**
 * Composant Navbar — Barre de navigation principale.
 *
 * Ce composant est affiché sur TOUTES les pages (déclaré dans AppComponent).
 * Il s'adapte selon l'état de connexion et le rôle de l'utilisateur.
 *
 * COMPORTEMENT :
 * ──────────────
 * Non connecté : Accueil | Connexion
 * ETUDIANT     : Accueil | Livres | Mon Profil | Déconnexion
 * ADMIN        : Accueil | Livres | Administration | Mon Profil | Déconnexion
 *
 * IMPORTS EXPLIQUÉS :
 * ────────────────────
 * CommonModule   → directives *ngIf, *ngFor, etc.
 * RouterLink     → directive [routerLink]="/home" pour la navigation
 * RouterLinkActive → ajoute une classe CSS quand le lien est actif (page courante)
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  /** Utilisateur connecté (ou null si déconnecté) */
  currentUser: UserSession | null = null;

  /** Contrôle l'ouverture du menu mobile */
  menuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * ngOnInit : cycle de vie Angular — exécuté APRÈS la construction du composant.
   *
   * On s'abonne à currentUser$ pour être notifié de chaque changement d'état.
   * Quand l'utilisateur se connecte ou se déconnecte, la navbar se met à jour
   * AUTOMATIQUEMENT sans rechargement de page.
   */
  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  /** Vérifie si l'utilisateur est admin */
  get isAdmin(): boolean {
    return this.currentUser?.role === 'ADMIN';
  }

  /** Déconnecte l'utilisateur et redirige vers la page de connexion */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /** Bascule le menu mobile (hamburger) */
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  /** Ferme le menu mobile (après clic sur un lien) */
  closeMenu(): void {
    this.menuOpen = false;
  }
}

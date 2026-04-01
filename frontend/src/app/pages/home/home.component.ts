import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

/**
 * Page d'accueil — accessible à tous (connectés ou non).
 *
 * Cette page sert de vitrine de l'application.
 * Elle présente les fonctionnalités et invite l'utilisateur à se connecter.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public authService: AuthService) {}

  /** Fonctionnalités affichées sur la page d'accueil */
  features = [
    {
      icon: 'menu_book',
      titre: 'Catalogue de livres',
      description: 'Explorez notre catalogue de livres universitaires dans de nombreuses disciplines.'
    },
    {
      icon: 'search',
      titre: 'Recherche rapide',
      description: 'Trouvez instantanément un livre par titre, auteur ou catégorie.'
    },
    {
      icon: 'admin_panel_settings',
      titre: 'Gestion admin',
      description: 'Les administrateurs gèrent les livres et les comptes étudiants facilement.'
    },
    {
      icon: 'account_circle',
      titre: 'Espace étudiant',
      description: 'Consultez votre profil et les livres disponibles à tout moment.'
    }
  ];

  /**
   * Fonction trackBy pour *ngFor.
   * Indique à Angular comment identifier chaque élément de façon unique.
   * Quand la liste change, Angular réutilise les éléments existants
   * au lieu de tout recréer → meilleures performances.
   */
  trackByIndex(index: number): number {
    return index;
  }
}

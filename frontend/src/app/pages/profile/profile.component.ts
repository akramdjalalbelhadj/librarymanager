import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models/user.model';

/**
 * Page de profil de l'utilisateur connecté.
 *
 * L'étudiant peut CONSULTER ses informations mais pas les modifier.
 * L'admin peut aussi voir son profil ici.
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user: User | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private userService: UserService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger le profil.';
        this.isLoading = false;
      }
    });
  }

  /** Retourne le libellé du rôle en français */
  getRoleLabel(role: string): string {
    return role === 'ADMIN' ? 'Administrateur' : 'Étudiant';
  }

  /** Retourne la classe CSS du badge de rôle */
  getRoleBadgeClass(role: string): string {
    return role === 'ADMIN' ? 'badge-danger' : 'badge-info';
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { User, CreateUserRequest } from '../../../models/user.model';

/**
 * Page de gestion des utilisateurs (ADMIN uniquement).
 *
 * FONCTIONNALITÉS :
 * ──────────────────
 * - Afficher la liste de tous les étudiants
 * - Formulaire de création d'un nouveau compte étudiant
 * - Activer / désactiver un compte
 *
 * GESTION DU FORMULAIRE :
 * ─────────────────────────
 * On utilise à nouveau les Reactive Forms.
 * Le formulaire de création est affiché/caché via showForm.
 */
@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit {

  users: User[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  /** Contrôle l'affichage du formulaire de création */
  showForm = false;

  /** true pendant la soumission du formulaire */
  isSubmitting = false;

  createForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.createForm = this.fb.group({
      nom:            ['', Validators.required],
      prenom:         ['', Validators.required],
      email:          ['', [Validators.required, Validators.email]],
      password:       ['', [Validators.required, Validators.minLength(6)]],
      numeroEtudiant: [''],
      role:           ['ETUDIANT', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les utilisateurs.';
        this.isLoading = false;
      }
    });
  }

  /** Affiche ou cache le formulaire de création */
  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.createForm.reset({ role: 'ETUDIANT' });
    }
  }

  /** Soumet le formulaire de création */
  onSubmit(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const request: CreateUserRequest = this.createForm.value;

    this.userService.createUser(request).subscribe({
      next: (user) => {
        this.isSubmitting = false;
        this.successMessage = `Compte créé avec succès pour ${user.prenom} ${user.nom}.`;
        this.showForm = false;
        this.createForm.reset({ role: 'ETUDIANT' });
        this.loadUsers(); // Recharge la liste
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Erreur lors de la création du compte.';
      }
    });
  }

  /** Active ou désactive un compte utilisateur */
  toggleStatus(user: User): void {
    if (!user.id) return;
    this.userService.toggleUserStatus(user.id).subscribe({
      next: (updated) => {
        // Met à jour l'utilisateur dans la liste sans recharger toute la liste
        const index = this.users.findIndex(u => u.id === updated.id);
        if (index !== -1) this.users[index] = updated;
        this.successMessage = `Compte ${updated.actif ? 'activé' : 'désactivé'} avec succès.`;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du changement de statut.';
      }
    });
  }

  /** Raccourcis pour les validateurs dans le template */
  getControl(name: string) { return this.createForm.get(name)!; }

  getRoleBadge(role: string): string {
    return role === 'ADMIN' ? 'badge-danger' : 'badge-info';
  }

  getRoleLabel(role: string): string {
    return role === 'ADMIN' ? 'Admin' : 'Étudiant';
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from '../../../core/services/book.service';
import { UserService } from '../../../core/services/user.service';

/**
 * Tableau de bord administrateur.
 *
 * Affiche une vue synthétique :
 * - Nombre total de livres
 * - Nombre d'étudiants
 * - Raccourcis vers les sections
 */
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {

  totalBooks = 0;
  totalStudents = 0;
  isLoading = true;

  constructor(
    private bookService: BookService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Chargement en parallèle des deux compteurs
    this.bookService.getAllBooks().subscribe(books => {
      this.totalBooks = books.length;
      this.checkLoading();
    });

    this.userService.getAllStudents().subscribe(students => {
      this.totalStudents = students.length;
      this.checkLoading();
    });
  }

  private loadedCount = 0;
  private checkLoading(): void {
    this.loadedCount++;
    if (this.loadedCount >= 2) this.isLoading = false;
  }

  /** Raccourcis vers les sections admin */
  shortcuts = [
    {
      icon: 'group_add',
      titre: 'Gérer les utilisateurs',
      description: 'Créer des comptes étudiants, activer/désactiver des comptes.',
      route: '/admin/users',
      color: 'primary'
    },
    {
      icon: 'menu_book',
      titre: 'Voir les livres',
      description: 'Consulter et rechercher dans le catalogue de livres.',
      route: '/books',
      color: 'secondary'
    }
  ];
}

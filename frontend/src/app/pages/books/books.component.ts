import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { BookService } from '../../core/services/book.service';
import { Book } from '../../models/book.model';

/**
 * Page de liste des livres.
 *
 * FONCTIONNALITÉS :
 * ──────────────────
 * - Affichage de tous les livres
 * - Barre de recherche avec debounce (attente avant d'envoyer la requête)
 * - Filtrage par catégorie
 * - Affichage du statut de disponibilité
 *
 * RXJS — OPÉRATEURS UTILISÉS :
 * ──────────────────────────────
 * debounceTime(300) :
 *   Attend 300ms après la dernière frappe avant d'émettre.
 *   Sans ça, une requête API serait envoyée à chaque touche saisie.
 *   Avec 300ms, si l'utilisateur tape "java", une seule requête est envoyée.
 *
 * distinctUntilChanged() :
 *   N'émet que si la valeur a CHANGÉ par rapport à la précédente.
 *   Évite une requête si l'utilisateur tape puis efface la même lettre.
 *
 * switchMap() :
 *   Si une nouvelle recherche arrive avant que la précédente soit terminée,
 *   annule la précédente et lance la nouvelle.
 *   Évite les problèmes de requêtes qui se terminent dans le mauvais ordre.
 *
 * takeUntil(this.destroy$) :
 *   Désinscription automatique quand le composant est détruit.
 *   Évite les "memory leaks" (fuites mémoire).
 */
@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit, OnDestroy {

  /** Liste de tous les livres affichés */
  books: Book[] = [];

  /** Texte de recherche (lié au champ input via [(ngModel)]) */
  searchKeyword = '';

  /** Catégorie sélectionnée pour le filtre */
  selectedCategory = '';

  /** Liste des catégories disponibles (calculée depuis les livres) */
  categories: string[] = [];

  /** États de chargement et d'erreur */
  isLoading = false;
  errorMessage = '';

  /**
   * Subject utilisé pour la recherche réactive.
   * On émet une nouvelle valeur à chaque frappe dans la barre de recherche.
   */
  private searchSubject = new Subject<string>();

  /**
   * Subject pour gérer la destruction du composant.
   * Quand on émet via destroy$, tous les observables takeUntil(destroy$) se terminent.
   */
  private destroy$ = new Subject<void>();

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
    this.setupSearch();
  }

  /**
   * Charge tous les livres au démarrage.
   */
  private loadBooks(): void {
    this.isLoading = true;
    this.bookService.getAllBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (books) => {
          this.books = books;
          this.extractCategories(books);
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Impossible de charger les livres.';
          this.isLoading = false;
        }
      });
  }

  /**
   * Configure la recherche réactive avec debounce.
   */
  private setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300),          // Attend 300ms après la dernière frappe
      distinctUntilChanged(),     // Ignore si la valeur n'a pas changé
      switchMap(keyword =>        // Annule la requête précédente si nouvelle frappe
        this.bookService.searchBooks(keyword)
      ),
      takeUntil(this.destroy$)    // Arrête quand le composant est détruit
    ).subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la recherche.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Appelée à chaque frappe dans la barre de recherche.
   * Émet la valeur dans le searchSubject → déclenche la pipeline RxJS.
   */
  onSearchChange(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.searchSubject.next(this.searchKeyword);
  }

  /** Réinitialise la recherche */
  clearSearch(): void {
    this.searchKeyword = '';
    this.selectedCategory = '';
    this.loadBooks();
  }

  /**
   * Extrait les catégories uniques depuis la liste de livres.
   * Utilisé pour le filtre par catégorie.
   */
  private extractCategories(books: Book[]): void {
    const cats = new Set(books.map(b => b.categorie));
    this.categories = Array.from(cats).sort();
  }

  /**
   * Filtre les livres affichés selon la catégorie sélectionnée.
   * Ce filtrage est CÔTÉ CLIENT (pas de requête API).
   */
  get filteredBooks(): Book[] {
    if (!this.selectedCategory) return this.books;
    return this.books.filter(b => b.categorie === this.selectedCategory);
  }

  /**
   * Retourne la classe CSS de disponibilité d'un livre.
   */
  getAvailabilityClass(book: Book): string {
    if (book.exemplairesDisponibles === 0) return 'badge-danger';
    if (book.exemplairesDisponibles <= 1) return 'badge-warning';
    return 'badge-success';
  }

  getAvailabilityText(book: Book): string {
    if (book.exemplairesDisponibles === 0) return 'Indisponible';
    return `${book.exemplairesDisponibles} dispo.`;
  }

  /** Nettoyage à la destruction du composant */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

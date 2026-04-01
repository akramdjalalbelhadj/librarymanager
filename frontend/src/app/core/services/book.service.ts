import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';

/**
 * Service pour la gestion des livres.
 *
 * Ce service est la couche de communication avec l'API backend.
 * Les composants (pages, components) n'appellent JAMAIS directement HttpClient —
 * ils passent toujours par le service.
 *
 * POURQUOI CETTE SÉPARATION ?
 * ────────────────────────────
 * Si l'URL de l'API change, on modifie UNIQUEMENT ce service.
 * Si on veut ajouter un cache, on le fait ici, pas dans chaque composant.
 * Les composants restent simples et testables.
 */
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API_URL = '/api/books';

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les livres.
   * GET /api/books
   */
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.API_URL);
  }

  /**
   * Recherche de livres par mot-clé.
   * GET /api/books/search?keyword=java
   *
   * HttpParams : manière propre de gérer les paramètres d'URL en Angular.
   * Évite la construction manuelle de chaînes comme '/search?keyword=' + keyword
   */
  searchBooks(keyword: string): Observable<Book[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Book[]>(`${this.API_URL}/search`, { params });
  }

  /**
   * Récupère un livre par son ID.
   * GET /api/books/{id}
   */
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.API_URL}/${id}`);
  }

  /**
   * Récupère uniquement les livres disponibles.
   * GET /api/books/available
   */
  getAvailableBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.API_URL}/available`);
  }

  /**
   * Crée un nouveau livre (ADMIN).
   * POST /api/books
   */
  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API_URL, book);
  }

  /**
   * Met à jour un livre (ADMIN).
   * PUT /api/books/{id}
   */
  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.API_URL}/${id}`, book);
  }

  /**
   * Supprime un livre (ADMIN).
   * DELETE /api/books/{id}
   */
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}

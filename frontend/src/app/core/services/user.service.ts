import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, CreateUserRequest } from '../../models/user.model';

/**
 * Service pour la gestion des utilisateurs.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL = '/api';

  constructor(private http: HttpClient) {}

  /**
   * Récupère le profil de l'utilisateur connecté.
   * GET /api/users/me
   */
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/users/me`);
  }

  /**
   * Récupère tous les utilisateurs (ADMIN).
   * GET /api/admin/users
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/admin/users`);
  }

  /**
   * Récupère tous les étudiants (ADMIN).
   * GET /api/admin/users/students
   */
  getAllStudents(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/admin/users/students`);
  }

  /**
   * Crée un nouvel utilisateur (ADMIN).
   * POST /api/admin/users
   */
  createUser(request: CreateUserRequest): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/admin/users`, request);
  }

  /**
   * Active ou désactive un compte (ADMIN).
   * PATCH /api/admin/users/{id}/toggle
   */
  toggleUserStatus(id: number): Observable<User> {
    return this.http.patch<User>(`${this.API_URL}/admin/users/${id}/toggle`, {});
  }
}

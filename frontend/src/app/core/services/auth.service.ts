import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, UserSession } from '../../models/auth.model';

/**
 * Service d'authentification.
 *
 * @Injectable({ providedIn: 'root' }) :
 * ──────────────────────────────────────
 * Ce décorateur rend le service injectable partout dans l'application.
 * "providedIn: 'root'" = Angular crée une seule instance (Singleton) pour toute l'app.
 * C'est important car l'état de connexion doit être partagé entre tous les composants.
 *
 * GESTION DE L'ÉTAT AVEC RXJS :
 * ────────────────────────────────
 * BehaviorSubject est un Observable spécial de RxJS :
 * - Il garde en mémoire la DERNIÈRE valeur émise
 * - Tout abonné reçoit IMMÉDIATEMENT la valeur courante (même s'il s'abonne tard)
 *
 * Flux :
 * 1. L'utilisateur se connecte → on met à jour currentUserSubject
 * 2. Tous les composants abonnés à currentUser$ sont notifiés automatiquement
 * 3. La navbar met à jour les liens, les guards autorisent/bloquent les routes, etc.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** URL de base de l'API backend */
  private readonly API_URL = '/api/auth';

  /** Clé de stockage dans localStorage */
  private readonly STORAGE_KEY = 'libraryManager_user';

  /**
   * BehaviorSubject contenant l'utilisateur connecté (ou null si déconnecté).
   * Private → seul ce service peut émettre de nouvelles valeurs.
   */
  private currentUserSubject: BehaviorSubject<UserSession | null>;

  /**
   * Observable public exposé aux composants.
   * Les composants s'y abonnent pour réagir aux changements d'état.
   */
  public currentUser$: Observable<UserSession | null>;

  constructor(private http: HttpClient) {
    // Au démarrage, on récupère l'utilisateur depuis localStorage
    // (pour rester connecté après un rechargement de page)
    const savedUser = this.getUserFromStorage();
    this.currentUserSubject = new BehaviorSubject<UserSession | null>(savedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * Retourne l'utilisateur connecté (valeur synchrone, pas besoin de subscribe).
   * Utile dans les guards et interceptors.
   */
  get currentUser(): UserSession | null {
    return this.currentUserSubject.value;
  }

  /**
   * Vérifie si un utilisateur est connecté.
   */
  get isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Vérifie si l'utilisateur connecté est admin.
   */
  get isAdmin(): boolean {
    return this.currentUser?.role === 'ADMIN';
  }

  /**
   * Effectue la connexion.
   *
   * this.http.post<LoginResponse>(...) :
   * - Envoie une requête POST au backend
   * - Le type générique <LoginResponse> dit à TypeScript le type de la réponse
   * - Retourne un Observable (asynchrone)
   *
   * pipe(tap(...)) :
   * - tap = effectue une action SANS modifier la valeur de l'Observable
   * - Ici on stocke le token et met à jour le BehaviorSubject
   * - Le composant qui appelle login() reçoit toujours la LoginResponse complète
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        // Construire l'objet session à stocker
        const session: UserSession = {
          token: response.token,
          id: response.id,
          nom: response.nom,
          prenom: response.prenom,
          email: response.email,
          role: response.role
        };

        // Sauvegarder en localStorage (persist après rechargement)
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));

        // Notifier tous les abonnés du changement d'état
        this.currentUserSubject.next(session);
      })
    );
  }

  /**
   * Déconnecte l'utilisateur.
   * Supprime le token du localStorage et met à jour l'état.
   */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  /**
   * Récupère le token JWT pour l'envoyer dans les requêtes.
   * Utilisé par l'interceptor HTTP.
   */
  getToken(): string | null {
    return this.currentUser?.token ?? null;
  }

  /**
   * Récupère l'utilisateur sauvegardé dans localStorage.
   */
  private getUserFromStorage(): UserSession | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
}

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Interceptor HTTP pour ajouter le token JWT à chaque requête.
 *
 * QU'EST-CE QU'UN INTERCEPTOR ?
 * ──────────────────────────────
 * Un interceptor s'intercale entre chaque requête HTTP et le serveur.
 * Il peut modifier la requête AVANT de l'envoyer, ou modifier la réponse APRÈS.
 *
 * SANS interceptor : chaque service devrait manuellement ajouter le header Authorization.
 * AVEC interceptor : on le fait une seule fois ici, pour TOUTES les requêtes.
 *
 * STYLE ANGULAR 17 — FUNCTIONAL INTERCEPTOR :
 * ─────────────────────────────────────────────
 * Angular 17 utilise des interceptors fonctionnels (une simple fonction)
 * plutôt que des classes. C'est plus simple et plus moderne.
 *
 * AVANT (Angular < 15) : implements HttpInterceptor { intercept(...) }
 * MAINTENANT (Angular 15+) : const authInterceptor: HttpInterceptorFn = (req, next) => { ... }
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // inject() permet d'utiliser l'injection de dépendances dans une fonction
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Si l'utilisateur est connecté et a un token
  if (token) {
    // On clone la requête (les requêtes HTTP sont immutables en Angular)
    // et on ajoute le header Authorization
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
        // Résultat : "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..."
      }
    });

    // On passe la requête modifiée au suivant dans la chaîne
    return next(authReq);
  }

  // Pas de token → on envoie la requête telle quelle (routes publiques)
  return next(req);
};

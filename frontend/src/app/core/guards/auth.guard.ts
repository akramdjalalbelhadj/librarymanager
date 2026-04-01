import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard pour protéger les routes nécessitant une connexion.
 *
 * QU'EST-CE QU'UN GUARD ?
 * ─────────────────────────
 * Un guard est une fonction qui décide si Angular peut naviguer vers une route.
 * Il retourne true (accès autorisé) ou false / UrlTree (accès refusé, redirection).
 *
 * On l'applique dans app.routes.ts avec "canActivate: [authGuard]".
 *
 * STYLE ANGULAR 17 — FUNCTIONAL GUARD :
 * ────────────────────────────────────────
 * Comme les interceptors, Angular 17 utilise des guards fonctionnels.
 * CanActivateFn est le type de la fonction guard.
 *
 * SCÉNARIOS :
 * - Utilisateur connecté → accès à la route (true)
 * - Utilisateur non connecté → redirection vers /login (false)
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true; // Accès autorisé
  }

  // Redirection vers la page de login
  // router.createUrlTree('/login') retourne un UrlTree que Angular utilise pour naviguer
  return router.createUrlTree(['/login']);
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard pour protéger les routes réservées aux admins.
 *
 * Vérifie DEUX conditions :
 * 1. L'utilisateur est connecté
 * 2. L'utilisateur a le rôle ADMIN
 *
 * Si non connecté → /login
 * Si connecté mais pas admin → /books (accueil étudiant)
 */
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn) {
    return router.createUrlTree(['/login']);
  }

  if (!authService.isAdmin) {
    // L'utilisateur est connecté mais n'est pas admin → page non autorisée
    return router.createUrlTree(['/books']);
  }

  return true;
};

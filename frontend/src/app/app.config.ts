import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

/**
 * Configuration globale de l'application Angular.
 *
 * C'est l'équivalent moderne du NgModule root (AppModule).
 * On y déclare tous les "providers" (services globaux, router, http...).
 *
 * PROVIDERS EXPLIQUÉS :
 * ──────────────────────
 *
 * provideRouter(routes) :
 *   Active le système de routing Angular avec nos routes définies.
 *   withComponentInputBinding() permet de passer des paramètres de route
 *   directement comme @Input() aux composants.
 *
 * provideHttpClient(withInterceptors([authInterceptor])) :
 *   Active le client HTTP Angular.
 *   withInterceptors([...]) enregistre nos interceptors HTTP fonctionnels.
 *   Grâce à authInterceptor, chaque requête aura automatiquement le token JWT.
 *
 * provideAnimations() :
 *   Active les animations Angular (transitions, fades...).
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Routing avec binding des paramètres de route comme @Input
    provideRouter(routes, withComponentInputBinding()),

    // Client HTTP avec l'interceptor JWT
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),

    // Animations Angular
    provideAnimations(),
  ]
};

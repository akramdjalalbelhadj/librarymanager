/**
 * main.ts — Point d'entrée de l'application Angular
 *
 * C'est le premier fichier exécuté par le navigateur.
 * Son rôle est de "bootstrapper" (démarrer) l'application Angular.
 *
 * ARCHITECTURE ANGULAR 17 — STANDALONE :
 * ─────────────────────────────────────────
 * Angular 17 utilise des "Standalone Components" par défaut.
 * Plus besoin de NgModule (les anciens modules Angular) — chaque composant
 * déclare directement ses dépendances. C'est plus simple et plus lisible.
 *
 * bootstrapApplication(AppComponent, appConfig) :
 * - AppComponent → le composant racine de l'application
 * - appConfig    → la configuration globale (routes, providers...)
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Erreur au démarrage Angular :', err));

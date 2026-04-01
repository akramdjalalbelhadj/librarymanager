import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

/**
 * Configuration des routes de l'application.
 *
 * COMMENT FONCTIONNE LE ROUTING ANGULAR ?
 * ─────────────────────────────────────────
 * Quand l'utilisateur navigue vers une URL, Angular cherche dans ce tableau
 * la route correspondante et charge le composant associé.
 *
 * Le composant est affiché à l'intérieur de <router-outlet> dans app.component.html.
 *
 * LAZY LOADING :
 * ───────────────
 * loadComponent: () => import('./pages/...').then(m => m.XxxComponent)
 *
 * C'est du lazy loading (chargement paresseux).
 * Angular ne télécharge le code d'un composant QUE quand l'utilisateur
 * navigue vers cette route. Avantages :
 * - Temps de chargement initial plus rapide
 * - Moins de code JavaScript téléchargé au départ
 *
 * GUARDS :
 * ─────────
 * canActivate: [authGuard]  → vérifie si l'utilisateur est connecté
 * canActivate: [adminGuard] → vérifie si l'utilisateur est admin
 */
export const routes: Routes = [

  // ─── Route racine → redirection vers /home ───
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'   // 'full' = l'URL doit être EXACTEMENT '' (pas juste commencer par '')
  },

  // ─── Page d'accueil — publique ───
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Accueil — LibraryManager'
  },

  // ─── Page de connexion — publique ───
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
    title: 'Connexion — LibraryManager'
  },

  // ─── Liste des livres — utilisateur connecté ───
  {
    path: 'books',
    loadComponent: () =>
      import('./pages/books/books.component').then(m => m.BooksComponent),
    canActivate: [authGuard],  // Protégé : doit être connecté
    title: 'Livres — LibraryManager'
  },

  // ─── Mon profil — utilisateur connecté ───
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard],
    title: 'Mon Profil — LibraryManager'
  },

  // ─── Administration — ADMIN uniquement ───
  {
    path: 'admin',
    canActivate: [adminGuard],  // Protégé : doit être ADMIN
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin/admin-dashboard/admin-dashboard.component')
            .then(m => m.AdminDashboardComponent),
        title: 'Tableau de bord — LibraryManager'
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/admin/admin-users/admin-users.component')
            .then(m => m.AdminUsersComponent),
        title: 'Gestion Utilisateurs — LibraryManager'
      }
    ]
  },

  // ─── Route inconnue → redirection vers /home ───
  {
    path: '**',
    redirectTo: 'home'
  }
];

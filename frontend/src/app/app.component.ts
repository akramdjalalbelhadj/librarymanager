import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

/**
 * Composant racine de l'application.
 *
 * AppComponent est le composant "enveloppe" — il contient :
 * - La barre de navigation (affichée sur toutes les pages)
 * - Le router-outlet (là où Angular injecte la page selon l'URL)
 *
 * STRUCTURE D'UNE PAGE :
 * ──────────────────────
 * <app-root>               ← AppComponent (toujours là)
 *   <app-navbar>           ← NavbarComponent (toujours là)
 *   <router-outlet>        ← La page change selon l'URL
 *     <app-home>           ← HomeComponent (si URL = /home)
 *     <app-login>          ← LoginComponent (si URL = /login)
 *     <app-books>          ← BooksComponent (si URL = /books)
 *   </router-outlet>
 * </app-root>
 *
 * STANDALONE COMPONENT :
 * ───────────────────────
 * imports: [RouterOutlet, NavbarComponent]
 * Dans un standalone component, on déclare directement les dépendances utilisées
 * dans le template. Pas besoin de NgModule.
 */
@Component({
  selector: 'app-root',      // Balise HTML : <app-root>
  standalone: true,
  imports: [
    RouterOutlet,             // Directive <router-outlet>
    NavbarComponent           // Notre barre de navigation
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LibraryManager';
}

/**
 * Modèle TypeScript pour un livre.
 * Correspond à BookDto.java côté backend.
 */
export interface Book {
  id?: number;           // ? = optionnel (absent pour une création)
  titre: string;
  auteur: string;
  isbn?: string;
  categorie: string;
  anneePublication: number;
  nombreExemplaires: number;
  exemplairesDisponibles: number;
  description?: string;
}

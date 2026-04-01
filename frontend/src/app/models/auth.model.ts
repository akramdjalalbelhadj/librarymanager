/**
 * Modèles TypeScript pour l'authentification.
 *
 * POURQUOI DES INTERFACES TYPESCRIPT ?
 * ──────────────────────────────────────
 * TypeScript est du JavaScript avec des types.
 * Les interfaces permettent de définir la "forme" d'un objet.
 *
 * Avantages :
 * - Autocomplétion dans l'IDE (on sait exactement quels champs existent)
 * - Erreurs détectées à la compilation, pas à l'exécution
 * - Documentation vivante du code
 *
 * Ces interfaces correspondent exactement aux DTOs du backend.
 */

/**
 * Requête de connexion envoyée au backend.
 * Correspond à LoginRequest.java
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Réponse du backend après connexion réussie.
 * Correspond à LoginResponse.java
 */
export interface LoginResponse {
  token: string;
  type: string;   // Toujours "Bearer"
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'ADMIN' | 'ETUDIANT';  // Union type : seulement ces deux valeurs possibles
}

/**
 * Informations de l'utilisateur stockées localement après connexion.
 * On stocke ces infos dans localStorage pour ne pas avoir à les recharger.
 */
export interface UserSession {
  token: string;
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'ADMIN' | 'ETUDIANT';
}

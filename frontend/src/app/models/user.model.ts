/**
 * Modèles TypeScript pour les utilisateurs.
 */

/**
 * Utilisateur renvoyé par l'API.
 * Correspond à UserDto.java — PAS de mot de passe.
 */
export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  numeroEtudiant?: string;
  role: 'ADMIN' | 'ETUDIANT';
  actif: boolean;
}

/**
 * Requête de création d'un utilisateur (par l'admin).
 * Correspond à CreateUserRequest.java — AVEC mot de passe.
 */
export interface CreateUserRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  numeroEtudiant?: string;
  role: 'ADMIN' | 'ETUDIANT';
}

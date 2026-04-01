package fr.amu.librarymanager.repository;

import fr.amu.librarymanager.entity.Role;
import fr.amu.librarymanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour l'entité User.
 *
 * COMMENT FONCTIONNE SPRING DATA JPA ?
 * ──────────────────────────────────────
 * On étend JpaRepository<User, Long> :
 * - User  → l'entité gérée par ce repository
 * - Long  → le type de la clé primaire (l'ID)
 *
 * Spring fournit AUTOMATIQUEMENT ces méthodes sans code :
 * - findById(id)       → trouve un utilisateur par son ID
 * - findAll()          → retourne tous les utilisateurs
 * - save(user)         → crée ou met à jour un utilisateur
 * - deleteById(id)     → supprime un utilisateur
 * - count()            → compte les utilisateurs
 * - existsById(id)     → vérifie si un utilisateur existe
 *
 * On peut aussi créer des méthodes personnalisées par convention de nommage.
 * Spring analyse le nom de la méthode et génère le SQL correspondant :
 *
 * findByEmail(email)   → SELECT * FROM users WHERE email = ?
 * findByRole(role)     → SELECT * FROM users WHERE role = ?
 * existsByEmail(email) → SELECT COUNT(*) > 0 FROM users WHERE email = ?
 */
@Repository  // Indique à Spring que c'est un composant de la couche d'accès aux données
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Trouve un utilisateur par son adresse email.
     *
     * Retourne Optional<User> plutôt que User directement :
     * - Si l'email n'existe pas, retourne Optional.empty()
     * - Évite les NullPointerException
     * - Force le code appelant à gérer le cas "utilisateur introuvable"
     *
     * Utilisé pour la connexion : on cherche l'utilisateur par email.
     */
    Optional<User> findByEmail(String email);

    /**
     * Vérifie si un email est déjà utilisé.
     * Utilisé avant de créer un compte pour éviter les doublons.
     */
    boolean existsByEmail(String email);

    /**
     * Récupère tous les utilisateurs ayant un rôle spécifique.
     * Utilisé par l'admin pour lister uniquement les étudiants.
     */
    List<User> findByRole(Role role);
}

package fr.amu.librarymanager.repository.user;

import fr.amu.librarymanager.entity.user.Role;
import fr.amu.librarymanager.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour l'entité User.
 * Regroupé dans repository.user avec tout ce qui concerne l'accès aux données des utilisateurs.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByRole(Role role);
}

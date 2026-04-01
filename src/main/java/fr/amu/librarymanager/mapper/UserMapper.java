package fr.amu.librarymanager.mapper;

import fr.amu.librarymanager.dto.CreateUserRequest;
import fr.amu.librarymanager.dto.UserDto;
import fr.amu.librarymanager.entity.User;
import org.springframework.stereotype.Component;

/**
 * Mapper pour la conversion entre User (entité) et UserDto (DTO).
 *
 * POURQUOI UN MAPPER MANUEL PLUTÔT QUE MAPSTRUCT ?
 * ──────────────────────────────────────────────────
 * MapStruct génère automatiquement le code de mapping à la compilation,
 * mais nécessite une configuration précise avec Lombok qui peut causer
 * des conflits dans certains environnements.
 *
 * Ce mapper manuel fait exactement la même chose, mais de façon explicite :
 * c'est même plus pédagogique car on voit exactement quel champ va où.
 *
 * @Component → Spring gère ce bean, on peut l'injecter avec @Autowired
 *              ou via le constructeur (@RequiredArgsConstructor).
 */
@Component
public class UserMapper {

    /**
     * Convertit un User (entité BDD) en UserDto (objet envoyé au frontend).
     *
     * RÈGLE DE SÉCURITÉ : on ne met JAMAIS le mot de passe dans le DTO.
     * UserDto n'a pas de champ "password" — c'est intentionnel.
     *
     * @param user L'entité User depuis la base de données
     * @return Le DTO sans données sensibles
     */
    public UserDto toDto(User user) {
        if (user == null) return null;

        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setNom(user.getNom());
        dto.setPrenom(user.getPrenom());
        dto.setEmail(user.getEmail());
        dto.setNumeroEtudiant(user.getNumeroEtudiant());
        dto.setRole(user.getRole());
        dto.setActif(user.isActif());
        return dto;
    }

    /**
     * Convertit un CreateUserRequest (données reçues du frontend) en User (entité).
     *
     * IMPORTANT : on ne copie PAS le mot de passe ici.
     * Le service UserService se charge de le hasher avec BCrypt avant de le setter.
     * L'id est null → la BDD le génère automatiquement (@GeneratedValue).
     * actif est true par défaut → nouveau compte actif.
     *
     * @param request Les données de création envoyées par l'admin
     * @return L'entité User prête à être sauvegardée (sans password encore)
     */
    public User toEntity(CreateUserRequest request) {
        if (request == null) return null;

        User user = new User();
        // id → null (sera généré par la BDD)
        user.setNom(request.getNom());
        user.setPrenom(request.getPrenom());
        user.setEmail(request.getEmail());
        // password → NON copié ici, le service le hashera
        user.setNumeroEtudiant(request.getNumeroEtudiant());
        user.setRole(request.getRole());
        user.setActif(true); // Tout nouveau compte est actif par défaut
        return user;
    }
}

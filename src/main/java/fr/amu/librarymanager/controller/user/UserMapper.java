package fr.amu.librarymanager.controller.user;

import fr.amu.librarymanager.entity.user.User;
import org.springframework.stereotype.Component;

/**
 * Mapper User ↔ UserDto.
 * Placé dans controller.user : il sert uniquement la couche controller/user.
 */
@Component
public class UserMapper {

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

    public User toEntity(CreateUserRequest request) {
        if (request == null) return null;

        User user = new User();
        user.setNom(request.getNom());
        user.setPrenom(request.getPrenom());
        user.setEmail(request.getEmail());
        user.setNumeroEtudiant(request.getNumeroEtudiant());
        user.setRole(request.getRole());
        user.setActif(true);
        return user;
    }
}

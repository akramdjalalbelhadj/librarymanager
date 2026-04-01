package fr.amu.librarymanager.controller.user;

import fr.amu.librarymanager.entity.user.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Requête de création d'un utilisateur envoyée par l'admin.
 * Contient le mot de passe en clair — le service le hashera.
 */
public class CreateUserRequest {

    @NotBlank
    private String nom;

    @NotBlank
    private String prenom;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 6)
    private String password;

    private String numeroEtudiant;

    @NotNull
    private Role role;

    public CreateUserRequest() {}

    public String getNom() { return nom; }
    public String getPrenom() { return prenom; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getNumeroEtudiant() { return numeroEtudiant; }
    public Role getRole() { return role; }

    public void setNom(String nom) { this.nom = nom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setNumeroEtudiant(String numeroEtudiant) { this.numeroEtudiant = numeroEtudiant; }
    public void setRole(Role role) { this.role = role; }
}

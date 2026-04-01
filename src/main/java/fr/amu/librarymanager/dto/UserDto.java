package fr.amu.librarymanager.dto;

import fr.amu.librarymanager.entity.Role;

public class UserDto {

    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String numeroEtudiant;
    private Role role;
    private boolean actif;

    public UserDto() {}

    public Long getId() { return id; }
    public String getNom() { return nom; }
    public String getPrenom() { return prenom; }
    public String getEmail() { return email; }
    public String getNumeroEtudiant() { return numeroEtudiant; }
    public Role getRole() { return role; }
    public boolean isActif() { return actif; }

    public void setId(Long id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public void setEmail(String email) { this.email = email; }
    public void setNumeroEtudiant(String numeroEtudiant) { this.numeroEtudiant = numeroEtudiant; }
    public void setRole(Role role) { this.role = role; }
    public void setActif(boolean actif) { this.actif = actif; }
}

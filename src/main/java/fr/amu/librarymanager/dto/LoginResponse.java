package fr.amu.librarymanager.dto;

import fr.amu.librarymanager.entity.Role;

public class LoginResponse {

    private String token;
    private String type = "Bearer";
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private Role role;

    public LoginResponse() {}

    public LoginResponse(String token, Long id, String nom, String prenom, String email, Role role) {
        this.token = token;
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.role = role;
    }

    public String getToken() { return token; }
    public String getType() { return type; }
    public Long getId() { return id; }
    public String getNom() { return nom; }
    public String getPrenom() { return prenom; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }

    public void setToken(String token) { this.token = token; }
    public void setType(String type) { this.type = type; }
    public void setId(Long id) { this.id = id; }
    public void setNom(String nom) { this.nom = nom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public void setEmail(String email) { this.email = email; }
    public void setRole(Role role) { this.role = role; }
}

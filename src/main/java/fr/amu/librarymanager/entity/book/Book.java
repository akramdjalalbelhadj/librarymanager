package fr.amu.librarymanager.entity.book;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

/**
 * Entité Book — représente la table "books" en base de données.
 * Placée dans le package entity.book pour regrouper tout ce qui concerne les livres.
 */
@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String titre;

    @NotBlank
    @Column(nullable = false)
    private String auteur;

    @Column(unique = true)
    private String isbn;

    @Column(nullable = false)
    private String categorie;

    @NotNull
    @Positive
    @Column(name = "annee_publication")
    private Integer anneePublication;

    @Column(name = "nombre_exemplaires", nullable = false)
    private int nombreExemplaires = 1;

    @Column(name = "exemplaires_disponibles", nullable = false)
    private int exemplairesDisponibles = 1;

    @Column(length = 1000)
    private String description;

    public Book() {}

    public Long getId() { return id; }
    public String getTitre() { return titre; }
    public String getAuteur() { return auteur; }
    public String getIsbn() { return isbn; }
    public String getCategorie() { return categorie; }
    public Integer getAnneePublication() { return anneePublication; }
    public int getNombreExemplaires() { return nombreExemplaires; }
    public int getExemplairesDisponibles() { return exemplairesDisponibles; }
    public String getDescription() { return description; }

    public void setId(Long id) { this.id = id; }
    public void setTitre(String titre) { this.titre = titre; }
    public void setAuteur(String auteur) { this.auteur = auteur; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public void setCategorie(String categorie) { this.categorie = categorie; }
    public void setAnneePublication(Integer anneePublication) { this.anneePublication = anneePublication; }
    public void setNombreExemplaires(int nombreExemplaires) { this.nombreExemplaires = nombreExemplaires; }
    public void setExemplairesDisponibles(int exemplairesDisponibles) { this.exemplairesDisponibles = exemplairesDisponibles; }
    public void setDescription(String description) { this.description = description; }

    @Override
    public String toString() {
        return "Book{id=" + id + ", titre='" + titre + "', auteur='" + auteur + "'}";
    }
}

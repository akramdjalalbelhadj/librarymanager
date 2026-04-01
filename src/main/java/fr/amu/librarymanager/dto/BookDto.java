package fr.amu.librarymanager.dto;

public class BookDto {

    private Long id;
    private String titre;
    private String auteur;
    private String isbn;
    private String categorie;
    private Integer anneePublication;
    private int nombreExemplaires;
    private int exemplairesDisponibles;
    private String description;

    public BookDto() {}

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
}

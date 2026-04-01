package fr.amu.librarymanager.repository;

import fr.amu.librarymanager.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour l'entité Book.
 *
 * Contient les méthodes d'accès aux livres en base de données.
 *
 * En plus des méthodes automatiques héritées de JpaRepository,
 * on définit ici des méthodes de recherche personnalisées.
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    /**
     * Recherche des livres par titre (recherche partielle, insensible à la casse).
     *
     * Convention de nommage Spring Data :
     * findBy + NomDuChamp + ContainingIgnoreCase
     *
     * Spring génère : SELECT * FROM books WHERE LOWER(titre) LIKE LOWER('%mot%')
     *
     * @param titre Le texte à rechercher dans le titre
     */
    List<Book> findByTitreContainingIgnoreCase(String titre);

    /**
     * Recherche des livres par auteur (recherche partielle, insensible à la casse).
     */
    List<Book> findByAuteurContainingIgnoreCase(String auteur);

    /**
     * Recherche des livres par catégorie (recherche exacte, insensible à la casse).
     */
    List<Book> findByCategorieIgnoreCase(String categorie);

    /**
     * Recherche globale : cherche le mot-clé dans le titre ET dans l'auteur.
     *
     * Ici on utilise @Query avec JPQL (Java Persistence Query Language)
     * car la convention de nommage serait trop complexe.
     *
     * JPQL ressemble à SQL mais travaille sur les entités Java (pas les tables).
     * "b.titre" = champ "titre" de la classe Book (pas la colonne SQL)
     *
     * :keyword = paramètre nommé, fourni par @Param("keyword")
     */
    @Query("SELECT b FROM Book b WHERE " +
           "LOWER(b.titre) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.auteur) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.categorie) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Book> searchByKeyword(@Param("keyword") String keyword);

    /**
     * Récupère uniquement les livres avec des exemplaires disponibles.
     * Utile pour afficher uniquement les livres empruntables.
     */
    List<Book> findByExemplairesDisponiblesGreaterThan(int minimum);
}

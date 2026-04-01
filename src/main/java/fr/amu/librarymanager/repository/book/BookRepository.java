package fr.amu.librarymanager.repository.book;

import fr.amu.librarymanager.entity.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour l'entité Book.
 * Regroupé dans repository.book avec tout ce qui concerne l'accès aux données des livres.
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTitreContainingIgnoreCase(String titre);

    List<Book> findByAuteurContainingIgnoreCase(String auteur);

    List<Book> findByCategorieIgnoreCase(String categorie);

    @Query("SELECT b FROM Book b WHERE " +
           "LOWER(b.titre) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.auteur) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.categorie) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Book> searchByKeyword(@Param("keyword") String keyword);

    List<Book> findByExemplairesDisponiblesGreaterThan(int minimum);
}

package fr.amu.librarymanager.mapper;

import fr.amu.librarymanager.dto.BookDto;
import fr.amu.librarymanager.entity.Book;
import org.springframework.stereotype.Component;

/**
 * Mapper pour la conversion entre Book (entité) et BookDto (DTO).
 *
 * Mapping manuel : on copie explicitement chaque champ.
 * C'est plus verbeux que MapStruct, mais 100% transparent et sans magie.
 */
@Component
public class BookMapper {

    /**
     * Convertit un Book (entité BDD) en BookDto.
     */
    public BookDto toDto(Book book) {
        if (book == null) return null;

        BookDto dto = new BookDto();
        dto.setId(book.getId());
        dto.setTitre(book.getTitre());
        dto.setAuteur(book.getAuteur());
        dto.setIsbn(book.getIsbn());
        dto.setCategorie(book.getCategorie());
        dto.setAnneePublication(book.getAnneePublication());
        dto.setNombreExemplaires(book.getNombreExemplaires());
        dto.setExemplairesDisponibles(book.getExemplairesDisponibles());
        dto.setDescription(book.getDescription());
        return dto;
    }

    /**
     * Convertit un BookDto en Book (entité).
     * L'id n'est pas copié : pour une création il sera généré par la BDD,
     * pour une mise à jour il est déjà dans l'entité existante chargée depuis la BDD.
     */
    public Book toEntity(BookDto dto) {
        if (dto == null) return null;

        Book book = new Book();
        book.setTitre(dto.getTitre());
        book.setAuteur(dto.getAuteur());
        book.setIsbn(dto.getIsbn());
        book.setCategorie(dto.getCategorie());
        book.setAnneePublication(dto.getAnneePublication());
        book.setNombreExemplaires(dto.getNombreExemplaires());
        book.setExemplairesDisponibles(dto.getExemplairesDisponibles());
        book.setDescription(dto.getDescription());
        return book;
    }
}

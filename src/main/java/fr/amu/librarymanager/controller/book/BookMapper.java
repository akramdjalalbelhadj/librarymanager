package fr.amu.librarymanager.controller.book;

import fr.amu.librarymanager.entity.book.Book;
import org.springframework.stereotype.Component;

/**
 * Mapper Book ↔ BookDto.
 * Placé dans controller.book : il sert uniquement la couche controller/book.
 */
@Component
public class BookMapper {

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

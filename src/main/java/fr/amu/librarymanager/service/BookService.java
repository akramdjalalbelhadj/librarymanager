package fr.amu.librarymanager.service;

import fr.amu.librarymanager.dto.BookDto;
import fr.amu.librarymanager.entity.Book;
import fr.amu.librarymanager.mapper.BookMapper;
import fr.amu.librarymanager.repository.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@Transactional
public class BookService {

    private static final Logger log = LoggerFactory.getLogger(BookService.class);

    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    public BookService(BookRepository bookRepository, BookMapper bookMapper) {
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
    }

    @Transactional(readOnly = true)
    public List<BookDto> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(bookMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public BookDto getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé : " + id));
        return bookMapper.toDto(book);
    }

    @Transactional(readOnly = true)
    public List<BookDto> searchBooks(String keyword) {
        if (!StringUtils.hasText(keyword)) {
            return getAllBooks();
        }
        return bookRepository.searchByKeyword(keyword.trim())
                .stream()
                .map(bookMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<BookDto> getAvailableBooks() {
        return bookRepository.findByExemplairesDisponiblesGreaterThan(0)
                .stream()
                .map(bookMapper::toDto)
                .toList();
    }

    public BookDto createBook(BookDto bookDto) {
        Book book = bookMapper.toEntity(bookDto);
        return bookMapper.toDto(bookRepository.save(book));
    }

    public BookDto updateBook(Long id, BookDto bookDto) {
        Book existing = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé : " + id));

        existing.setTitre(bookDto.getTitre());
        existing.setAuteur(bookDto.getAuteur());
        existing.setIsbn(bookDto.getIsbn());
        existing.setCategorie(bookDto.getCategorie());
        existing.setAnneePublication(bookDto.getAnneePublication());
        existing.setNombreExemplaires(bookDto.getNombreExemplaires());
        existing.setExemplairesDisponibles(bookDto.getExemplairesDisponibles());
        existing.setDescription(bookDto.getDescription());

        return bookMapper.toDto(bookRepository.save(existing));
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Livre non trouvé : " + id);
        }
        bookRepository.deleteById(id);
    }
}

package fr.amu.librarymanager.config;

import fr.amu.librarymanager.entity.Book;
import fr.amu.librarymanager.entity.Role;
import fr.amu.librarymanager.entity.User;
import fr.amu.librarymanager.repository.BookRepository;
import fr.amu.librarymanager.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           BookRepository bookRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            log.info("=== Initialisation des données fictives ===");
            initUsers();
            initBooks();
            log.info("=== Initialisation terminée ===");
        };
    }

    private void initUsers() {
        if (userRepository.count() > 0) return;

        User admin = new User();
        admin.setNom("Administrateur");
        admin.setPrenom("Principal");
        admin.setEmail("admin@library.fr");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(Role.ADMIN);
        admin.setActif(true);

        User alice = new User();
        alice.setNom("Martin");
        alice.setPrenom("Alice");
        alice.setEmail("alice.martin@univ.fr");
        alice.setPassword(passwordEncoder.encode("password"));
        alice.setNumeroEtudiant("21234001");
        alice.setRole(Role.ETUDIANT);
        alice.setActif(true);

        User bob = new User();
        bob.setNom("Dupont");
        bob.setPrenom("Bob");
        bob.setEmail("bob.dupont@univ.fr");
        bob.setPassword(passwordEncoder.encode("password"));
        bob.setNumeroEtudiant("21234002");
        bob.setRole(Role.ETUDIANT);
        bob.setActif(true);

        User claire = new User();
        claire.setNom("Leclerc");
        claire.setPrenom("Claire");
        claire.setEmail("claire.leclerc@univ.fr");
        claire.setPassword(passwordEncoder.encode("password"));
        claire.setNumeroEtudiant("21234003");
        claire.setRole(Role.ETUDIANT);
        claire.setActif(false);

        userRepository.save(admin);
        userRepository.save(alice);
        userRepository.save(bob);
        userRepository.save(claire);

        log.info("4 utilisateurs créés — admin@library.fr / admin123");
    }

    private void initBooks() {
        if (bookRepository.count() > 0) return;

        bookRepository.save(createBook("Clean Code", "Robert C. Martin",
                "978-0-13-235088-4", "Informatique", 2008, 3, 2,
                "Un guide pratique pour écrire du code propre et maintenable."));

        bookRepository.save(createBook("Design Patterns", "Gang of Four",
                "978-0-20-163361-5", "Informatique", 1994, 2, 2,
                "Les 23 patterns de conception orientée objet."));

        bookRepository.save(createBook("Spring Boot en action", "Craig Walls",
                "978-2-74-402027-3", "Informatique", 2016, 4, 3,
                "Guide complet pour créer des applications Spring Boot."));

        bookRepository.save(createBook("Introduction aux algorithmes", "Cormen et al.",
                "978-2-10-070804-8", "Informatique", 2009, 5, 4,
                "La bible des algorithmes et structures de données."));

        bookRepository.save(createBook("Analyse mathématique - Tome 1", "Walter Rudin",
                "978-2-10-072345-4", "Mathématiques", 2015, 3, 1,
                "Introduction rigoureuse à l'analyse réelle."));

        bookRepository.save(createBook("Algèbre linéaire", "Gilbert Strang",
                "978-0-98-023156-6", "Mathématiques", 2016, 4, 4,
                "Cours complet d'algèbre linéaire avec applications."));

        bookRepository.save(createBook("Mécanique quantique", "Cohen-Tannoudji",
                "978-2-70-560455-3", "Physique", 2018, 2, 0,
                "La référence en mécanique quantique."));

        bookRepository.save(createBook("Le Petit Prince", "Antoine de Saint-Exupéry",
                "978-2-07-040850-4", "Littérature", 1943, 6, 5,
                "Un conte poétique et philosophique pour tous les âges."));

        bookRepository.save(createBook("Principes d'économie", "N. Gregory Mankiw",
                "978-2-80-730234-1", "Économie", 2020, 3, 2,
                "Introduction à l'économie micro et macro."));

        bookRepository.save(createBook("Intelligence Artificielle", "Russell & Norvig",
                "978-2-32-600054-8", "Informatique", 2021, 2, 1,
                "La référence mondiale en Intelligence Artificielle."));

        log.info("10 livres créés");
    }

    private Book createBook(String titre, String auteur, String isbn, String categorie,
                             int annee, int total, int disponibles, String description) {
        Book book = new Book();
        book.setTitre(titre);
        book.setAuteur(auteur);
        book.setIsbn(isbn);
        book.setCategorie(categorie);
        book.setAnneePublication(annee);
        book.setNombreExemplaires(total);
        book.setExemplairesDisponibles(disponibles);
        book.setDescription(description);
        return book;
    }
}

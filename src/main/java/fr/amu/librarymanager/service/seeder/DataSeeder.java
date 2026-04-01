package fr.amu.librarymanager.service.seeder;

import fr.amu.librarymanager.entity.book.Book;
import fr.amu.librarymanager.entity.user.Role;
import fr.amu.librarymanager.entity.user.User;
import fr.amu.librarymanager.repository.book.BookRepository;
import fr.amu.librarymanager.repository.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Seeder — données fictives insérées au démarrage de l'application.
 *
 * Placé dans service.seeder : c'est un service qui "sème" (seed) les données initiales.
 * On le sépare de la config pour respecter le principe de responsabilité unique.
 *
 * Un seeder ne doit exister qu'en développement/démo.
 * En production, on utiliserait des scripts de migration (Flyway, Liquibase).
 */
@Configuration
public class DataSeeder {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      BookRepository bookRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public CommandLineRunner seedData() {
        return args -> {
            log.info("=== Démarrage du Seeder ===");
            seedUsers();
            seedBooks();
            log.info("=== Seeder terminé ===");
        };
    }

    private void seedUsers() {
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

    private void seedBooks() {
        if (bookRepository.count() > 0) return;

        bookRepository.save(book("Clean Code", "Robert C. Martin",
                "978-0-13-235088-4", "Informatique", 2008, 3, 2,
                "Un guide pratique pour écrire du code propre et maintenable."));

        bookRepository.save(book("Design Patterns", "Gang of Four",
                "978-0-20-163361-5", "Informatique", 1994, 2, 2,
                "Les 23 patterns de conception orientée objet."));

        bookRepository.save(book("Spring Boot en action", "Craig Walls",
                "978-2-74-402027-3", "Informatique", 2016, 4, 3,
                "Guide complet pour créer des applications Spring Boot."));

        bookRepository.save(book("Introduction aux algorithmes", "Cormen et al.",
                "978-2-10-070804-8", "Informatique", 2009, 5, 4,
                "La bible des algorithmes et structures de données."));

        bookRepository.save(book("Analyse mathématique - Tome 1", "Walter Rudin",
                "978-2-10-072345-4", "Mathématiques", 2015, 3, 1,
                "Introduction rigoureuse à l'analyse réelle."));

        bookRepository.save(book("Algèbre linéaire", "Gilbert Strang",
                "978-0-98-023156-6", "Mathématiques", 2016, 4, 4,
                "Cours complet d'algèbre linéaire avec applications."));

        bookRepository.save(book("Mécanique quantique", "Cohen-Tannoudji",
                "978-2-70-560455-3", "Physique", 2018, 2, 0,
                "La référence en mécanique quantique."));

        bookRepository.save(book("Le Petit Prince", "Antoine de Saint-Exupéry",
                "978-2-07-040850-4", "Littérature", 1943, 6, 5,
                "Un conte poétique et philosophique pour tous les âges."));

        bookRepository.save(book("Principes d'économie", "N. Gregory Mankiw",
                "978-2-80-730234-1", "Économie", 2020, 3, 2,
                "Introduction à l'économie micro et macro."));

        bookRepository.save(book("Intelligence Artificielle", "Russell & Norvig",
                "978-2-32-600054-8", "Informatique", 2021, 2, 1,
                "La référence mondiale en Intelligence Artificielle."));

        log.info("10 livres créés");
    }

    private Book book(String titre, String auteur, String isbn, String categorie,
                      int annee, int total, int disponibles, String description) {
        Book b = new Book();
        b.setTitre(titre);
        b.setAuteur(auteur);
        b.setIsbn(isbn);
        b.setCategorie(categorie);
        b.setAnneePublication(annee);
        b.setNombreExemplaires(total);
        b.setExemplairesDisponibles(disponibles);
        b.setDescription(description);
        return b;
    }
}

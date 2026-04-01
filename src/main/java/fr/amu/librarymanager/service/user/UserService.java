package fr.amu.librarymanager.service.user;

import fr.amu.librarymanager.controller.user.CreateUserRequest;
import fr.amu.librarymanager.controller.user.UserDto;
import fr.amu.librarymanager.controller.user.UserMapper;
import fr.amu.librarymanager.entity.user.Role;
import fr.amu.librarymanager.entity.user.User;
import fr.amu.librarymanager.repository.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service pour la gestion des utilisateurs.
 * Placé dans service.user pour regrouper toute la logique métier des utilisateurs.
 */
@Service
@Transactional
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       UserMapper userMapper,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(userMapper::toDto).toList();
    }

    @Transactional(readOnly = true)
    public List<UserDto> getAllStudents() {
        return userRepository.findByRole(Role.ETUDIANT).stream().map(userMapper::toDto).toList();
    }

    @Transactional(readOnly = true)
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé : " + email));
        return userMapper.toDto(user);
    }

    public UserDto createUser(CreateUserRequest request) {
        log.info("Création d'un utilisateur : {}", request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email déjà utilisé : " + request.getEmail());
        }

        User user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User saved = userRepository.save(user);
        log.info("Utilisateur créé avec l'id : {}", saved.getId());
        return userMapper.toDto(saved);
    }

    public UserDto toggleUserStatus(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé : " + id));
        user.setActif(!user.isActif());
        return userMapper.toDto(userRepository.save(user));
    }
}

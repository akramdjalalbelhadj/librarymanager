package fr.amu.librarymanager.service.auth;

import fr.amu.librarymanager.controller.auth.LoginRequest;
import fr.amu.librarymanager.controller.auth.LoginResponse;
import fr.amu.librarymanager.entity.user.User;
import fr.amu.librarymanager.repository.user.UserRepository;
import fr.amu.librarymanager.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

/**
 * Service d'authentification.
 * Placé dans service.auth pour regrouper tout ce qui concerne la connexion.
 */
@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    public AuthService(AuthenticationManager authenticationManager,
                       JwtTokenProvider jwtTokenProvider,
                       UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
    }

    public LoginResponse login(LoginRequest request) {
        log.info("Tentative de connexion pour : {}", request.getEmail());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = jwtTokenProvider.generateToken(authentication);
        log.info("Connexion réussie pour : {}", request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable après authentification"));

        return new LoginResponse(token, user.getId(), user.getNom(), user.getPrenom(), user.getEmail(), user.getRole());
    }
}

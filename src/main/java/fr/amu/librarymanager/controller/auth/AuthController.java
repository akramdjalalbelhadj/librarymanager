package fr.amu.librarymanager.controller.auth;

import fr.amu.librarymanager.service.auth.AuthService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller d'authentification.
 * Regroupé dans controller.auth avec LoginRequest et LoginResponse.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        log.info("Requête de connexion reçue pour : {}", request.getEmail());
        return ResponseEntity.ok(authService.login(request));
    }
}

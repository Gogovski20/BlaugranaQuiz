package com.vladimir.blaugranaquiz.services;

import com.vladimir.blaugranaquiz.dtos.*;
import com.vladimir.blaugranaquiz.entities.AppUser;
import com.vladimir.blaugranaquiz.entities.Role;
import com.vladimir.blaugranaquiz.exceptions.BadRequestException;
import com.vladimir.blaugranaquiz.exceptions.UnauthorizedException;
import com.vladimir.blaugranaquiz.repositories.AppUserRepository;
import com.vladimir.blaugranaquiz.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(AppUserRepository appUserRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.appUserRepository = appUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public RegisterResponse register(RegisterRequest request) {
        String username = request.getUsername().trim();
        String email = request.getEmail().trim().toLowerCase();

        if (appUserRepository.existsByUsername(username)) {
            throw new BadRequestException("Username is already taken.");
        }

        if (appUserRepository.existsByEmail(email)) {
            throw new BadRequestException("Email is already registered.");
        }

        AppUser user = new AppUser(
                username,
                email,
                passwordEncoder.encode(request.getPassword()),
                Role.USER
        );

        AppUser savedUser = appUserRepository.save(user);

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole().name(),
                "Registration successful. Please log in."
        );
    }

    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        request.getPassword()
                )
        );

        if (!authentication.isAuthenticated()) {
            throw new UnauthorizedException("Invalid email or password.");
        }

        AppUser user = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password."));

        String token = jwtService.generateToken(user);

        return new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    public CurrentUserResponse getCurrentUser(String email) {
        AppUser user = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("User not found."));

        return new CurrentUserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}
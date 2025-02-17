package com.example.familytaskmanager.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors() // Activează CORS (folosește configurația din CorsConfig)
            .and()
            .authorizeRequests()
//               // Permite toate requesturile OPTIONS
//               .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//               .antMatchers("/auth/**").permitAll()
//               // Doar ADMIN și PARENT pot accesa rutele de familie
//               .antMatchers("/api/family/**").hasAnyAuthority("ADMIN", "PARENT")
          .anyRequest().permitAll()
           .and()
            .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}

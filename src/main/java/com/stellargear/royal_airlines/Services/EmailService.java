package com.stellargear.royal_airlines.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;


    public void sendVerificationEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("");
        message.setTo(to);
        message.setSubject("Verifica tu cuenta");
        message.setText("Para verificar tu cuenta, haz clic en el siguiente enlace: "
                + "http://localhost:8080/api/users/verify?verificationCode=" + token);

        mailSender.send(message);
    }
}

package com.stellargear.royal_airlines.Controllers;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatClient chatClient;

    public ChatController (ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

   @GetMapping(produces = "text/plain;charset=UTF-8")
    public String chat(@RequestParam String message) {

        return this.chatClient
            .prompt()
            .system("""
                Responde como asistente de Royal Airlines.

                Formato obligatorio:
                RESPUESTA: <texto>

                Reglas:
                - Español solamente
                - Máximo 2 líneas
                - Solo temas de aerolínea
                - No explicaciones
            """)
            .user("Pregunta: " + message)
            .call()
            .content()
            .replace("RESPUESTA:", "")
            .trim();
    }
}

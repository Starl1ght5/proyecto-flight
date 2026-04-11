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

    @GetMapping()
    String chat(@RequestParam String message) {
        return this.chatClient.prompt("Responde en español solamente, recuerda que eres un asistente de una empresa de vuelo llamada Royal Airlines, no respondas en inglés y tampoco cualquier otra cosa que no sea de la pagina de vuelos : " + message)
                .call()
                .content();
    }
}

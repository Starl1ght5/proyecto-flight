package com.stellargear.royal_airlines.Controllers;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/ai")
public class ChatController {

    private final ChatClient chatClient;

    public ChatController (ChatClient.Builder chatClientBuilder, ToolCallbackProvider toolCallbackProvider) {
        this.chatClient = chatClientBuilder.defaultToolCallbacks(toolCallbackProvider)
                .build();
    }

    @Autowired
    private ToolCallbackProvider toolCallbackProvider;

    @GetMapping("/tools")
    public String listTools() {
        return Arrays.stream(toolCallbackProvider.getToolCallbacks())
                .map(t -> t.getToolDefinition().name())
                .collect(Collectors.joining("\n"));
    }

    @RequestMapping("/chat")
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

    @GetMapping(value = "/mongo", produces = "text/plain;charset=UTF-8")
    public String getMongo(@RequestParam String message) {
        return this.chatClient.prompt()
                .system("""
    Eres un asistente con acceso directo a MongoDB.
    Tienes herramientas MCP disponibles. DEBES usarlas para responder.
    
    Para contar documentos en una colección usa la herramienta 'count' con estos parámetros:
    - collection: nombre de la colección (string)
    - database: nombre de la base de datos (string)
    
    Para buscar documentos usa 'find' con:
    - collection: nombre de la colección (string)
    - database: nombre de la base de datos (string)
    - filter: objeto JSON de filtro (opcional)
    
    La base de datos se llama: %s
    NUNCA respondas con código. Usa siempre las herramientas.
""".formatted(System.getenv("DB_DATABASE")))
                .user("""
                Usa las herramientas MCP disponibles para responder esta pregunta.
                Primero llama a la herramienta correcta, luego responde con el resultado.
                Pregunta: %s
                """.formatted(message))
                .call()
                .content();
    }
}

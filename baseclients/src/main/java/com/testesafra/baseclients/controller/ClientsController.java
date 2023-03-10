package com.testesafra.baseclients.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.testesafra.baseclients.model.ClientsModel;
import com.testesafra.baseclients.repository.ClientsRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/clients")
@AllArgsConstructor
public class ClientsController {

    @Autowired
    private final ClientsRepository clientsRepository;

    @GetMapping
    public List<ClientsModel> list() {
        return clientsRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientsModel> findClientId(@PathVariable Long id) {
        return clientsRepository.findById(id).map(recordId -> ResponseEntity.ok().body(recordId)).orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ClientsModel> createClient(@RequestBody ClientsModel recClient) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clientsRepository.save(recClient));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientsModel> updateClient(@PathVariable Long id, @RequestBody ClientsModel recClient) {
        return clientsRepository.findById(id).map(recordFound -> {
            recordFound.setName(recClient.getName());
            recordFound.setCpf(recClient.getCpf());
            recordFound.setDataNascimento(recClient.getDataNascimento());
            recordFound.setRendaMensal(recClient.getRendaMensal());
            recordFound.setEmail(recClient.getEmail());
            recordFound.setDataCadastro(recClient.getDataCadastro());

            ClientsModel updated = clientsRepository.save(recordFound);
            return ResponseEntity.ok().body(updated);

        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        return clientsRepository.findById(id).map(recordFound -> {
            clientsRepository.deleteById(id);
            return ResponseEntity.noContent().<Void>build();

        }).orElse(ResponseEntity.notFound().build());
    }
}

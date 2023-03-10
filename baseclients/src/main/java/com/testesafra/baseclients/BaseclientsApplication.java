package com.testesafra.baseclients;

import com.testesafra.baseclients.model.ClientsModel;
import com.testesafra.baseclients.repository.ClientsRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BaseclientsApplication {

	public static void main(String[] args) {
		SpringApplication.run(BaseclientsApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(ClientsRepository clientsRepository) {
		return args -> {
			clientsRepository.deleteAll();
 
			ClientsModel c = new ClientsModel();
			c.setName("Walter");
			c.setLastname("Fernandes");
			c.setCpf("111.222.333-00");
			c.setDataNascimento("25/10/1987");
			c.setRendaMensal("10000,00");
			c.setEmail("walter.fernandes@gft.com");
			c.setDataCadastro("09/08/2023");
			clientsRepository.save(c);
		};
	}
}
 
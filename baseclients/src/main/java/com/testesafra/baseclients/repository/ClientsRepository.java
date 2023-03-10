package com.testesafra.baseclients.repository;
import com.testesafra.baseclients.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
 
public interface ClientsRepository extends JpaRepository<ClientsModel, Long> {
 
}
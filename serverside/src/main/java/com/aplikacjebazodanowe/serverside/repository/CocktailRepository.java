package com.aplikacjebazodanowe.serverside.repository;

import com.aplikacjebazodanowe.serverside.model.Cocktail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CocktailRepository extends JpaRepository<Cocktail, Integer> {
    @Query("SELECT c FROM Cocktail c WHERE c.baseAlcohol = ?1")
    List<Cocktail> getCocktailByAlcohol(String alcohol);
}

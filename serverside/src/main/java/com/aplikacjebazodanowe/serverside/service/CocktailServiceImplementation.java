package com.aplikacjebazodanowe.serverside.service;

import com.aplikacjebazodanowe.serverside.model.Cocktail;
import com.aplikacjebazodanowe.serverside.repository.CocktailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CocktailServiceImplementation implements  CocktailService {

    @Autowired
    private CocktailRepository cocktailRepository;

    @Override
    public Cocktail getCocktailById(Integer id) {
        return cocktailRepository.findById(id).get();
    }

    @Override
    public List<Cocktail> getAllCocktails() {
        return cocktailRepository.findAll();
    }

    @Override
    public List<Cocktail> getCocktailsByAlcohol(String alcohol) {
        return cocktailRepository.getCocktailByAlcohol(alcohol);
    }

    @Override
    public Cocktail addCocktail(Cocktail cocktail) {
        return cocktailRepository.save(cocktail);
    }

    @Override
    public void deleteCocktail(Integer id) {
        cocktailRepository.deleteById(id);
    }

    @Override
    public void deleteAllCocktails() {
        cocktailRepository.deleteAll();
    }
}

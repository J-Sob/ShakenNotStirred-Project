package com.aplikacjebazodanowe.serverside.service;

import com.aplikacjebazodanowe.serverside.model.Cocktail;

import java.util.List;

public interface CocktailService {
    public Cocktail getCocktailById(Integer id);
    public List<Cocktail> getAllCocktails();
    public List<Cocktail> getCocktailsByAlcohol(String alcohol);
    public Cocktail addCocktail(Cocktail cocktail);
    public void deleteCocktail(Integer id);
}

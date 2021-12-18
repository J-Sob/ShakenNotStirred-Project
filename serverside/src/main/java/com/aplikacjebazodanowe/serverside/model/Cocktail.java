package com.aplikacjebazodanowe.serverside.model;

import org.springframework.lang.NonNull;

import javax.persistence.*;

@Entity
public class Cocktail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String image;
    private String baseAlcohol;
    private String ingredients;
    private String method;
    private String description;
    private String glass;

    public Cocktail() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getBaseAlcohol() {
        return baseAlcohol;
    }

    public void setBaseAlcohol(String baseAlcohol) {
        this.baseAlcohol = baseAlcohol;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGlass() {
        return glass;
    }

    public void setGlass(String glass) {
        this.glass = glass;
    }
}

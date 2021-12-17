package com.aplikacjebazodanowe.serverside.controller;

import com.aplikacjebazodanowe.serverside.model.Cocktail;
import com.aplikacjebazodanowe.serverside.service.CocktailService;
import com.aplikacjebazodanowe.serverside.utility.FileUploadUtil;
import org.apache.tomcat.util.http.fileupload.FileUpload;
import org.apache.tomcat.util.http.fileupload.FileUploadBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/cocktail")
public class CocktailController {

    @Autowired
    private CocktailService cocktailService;

    @PostMapping("/addCocktail")
    public ResponseEntity<String> addCocktail(@RequestBody Cocktail cocktail, @RequestParam("image")MultipartFile multipartFile){
        String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        cocktail.setImage(filename);
        String imagesDirectory = "cocktailImages/" + cocktail.getId();
        try {
            FileUploadUtil.saveFile(imagesDirectory,filename,multipartFile);
            cocktailService.addCocktail(cocktail);
            return new ResponseEntity<String>("Cocktail has been added", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FAILED_DEPENDENCY);
        }
    }

    @GetMapping("/getAllCocktails")
    public ResponseEntity<List<Cocktail>> getAllCocktails(){
        return new ResponseEntity<>(cocktailService.getAllCocktails(), HttpStatus.OK);
    }

    @GetMapping("/getCocktail/{id}")
    public ResponseEntity<Cocktail> getCocktailById(@PathVariable Integer id){
        try{
            Cocktail cocktail = cocktailService.getCocktailById(id);
            return new ResponseEntity<Cocktail>(cocktail, HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<Cocktail>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getCocktailByAlcohol/{alcohol}")
    public ResponseEntity<List<Cocktail>> getCocktailByAlcohol(@PathVariable String alcohol){
        List<Cocktail> cocktails = cocktailService.getCocktailsByAlcohol(alcohol);
        return new ResponseEntity<>(cocktails, HttpStatus.OK);
    }

    @DeleteMapping("/deleteCocktail/{id}")
    public ResponseEntity<String> deleteCocktail(@PathVariable Integer id){
        try{
            cocktailService.deleteCocktail(id);
            return new ResponseEntity<>("Cocktail deleted", HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<>("Cocktail not found", HttpStatus.NOT_FOUND);
        }
    }
}

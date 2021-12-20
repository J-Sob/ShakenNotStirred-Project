package com.aplikacjebazodanowe.serverside.controller;

import com.aplikacjebazodanowe.serverside.model.Cocktail;
import com.aplikacjebazodanowe.serverside.service.CocktailService;
import com.aplikacjebazodanowe.serverside.utility.FileUploadUtil;
import org.apache.tomcat.util.http.fileupload.FileUpload;
import org.apache.tomcat.util.http.fileupload.FileUploadBase;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/cocktail")
public class CocktailController {

    @Autowired
    private CocktailService cocktailService;

    @PostMapping("/addCocktail")
    public ResponseEntity<?> addCocktail(@RequestBody Cocktail cocktail){
        try{
            cocktailService.addCocktail(cocktail);
            return new ResponseEntity<>(cocktail.getId(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/addCocktailImage/{id}")
    public ResponseEntity<String> addCocktailImage(@PathVariable Integer id, @RequestParam("image")MultipartFile multipartFile){
        String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        Cocktail cocktail = cocktailService.getCocktailById(id);
        cocktail.setImage(filename);
        String imagesDirectory = "images/cocktailImages";
        try {
            FileUploadUtil.saveFile(imagesDirectory,filename,multipartFile);
            cocktailService.addCocktail(cocktail);
            return new ResponseEntity<String>("Cocktail has been added", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FAILED_DEPENDENCY);
        }
    }

    @GetMapping("/getAllCocktails")
    public ResponseEntity<?> getAllCocktails(){
        try {
            return new ResponseEntity<>(cocktailService.getAllCocktails(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getCocktail/{id}")
    public ResponseEntity<?> getCocktailById(@PathVariable Integer id){
        try{
            Cocktail cocktail = cocktailService.getCocktailById(id);
            return new ResponseEntity<>(cocktail, HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<>("404: Cocktail not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/getImage/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody ResponseEntity<?> getImage(@PathVariable Integer id) throws IOException {
        try {
            Cocktail cocktail = cocktailService.getCocktailById(id);
            String imagePath = cocktail.getImagePath();
            ByteArrayResource byteArrayResource = new ByteArrayResource(Files.readAllBytes(Paths.get(imagePath)));
            return new ResponseEntity<>(byteArrayResource, HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<>("Cocktail image not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/getAllImages", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody ResponseEntity<?> getAllImages() throws IOException{
        try{
            List<Cocktail> cocktails = cocktailService.getAllCocktails();
            List<ByteArrayResource> images = new ArrayList<ByteArrayResource>();
            for(Cocktail cocktail : cocktails) {
                String imagePath = cocktail.getImagePath();
                ByteArrayResource byteArrayResource = new ByteArrayResource(Files.readAllBytes(Paths.get(imagePath)));
                images.add(byteArrayResource);
            }
            return new ResponseEntity<>(images, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Something went wrong", HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/getImagePath/{id}")
    public ResponseEntity<?> getImagePath(@PathVariable Integer id){
        try{
            Cocktail cocktail = cocktailService.getCocktailById(id);
            return new ResponseEntity<>(cocktail.getImagePath(), HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<>("Cocktail not found", HttpStatus.NOT_FOUND);
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

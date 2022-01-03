package com.aplikacjebazodanowe.serverside.controller;

import com.aplikacjebazodanowe.serverside.model.Comment;
import com.aplikacjebazodanowe.serverside.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/addComment")
    public ResponseEntity<?> addComment(@RequestBody Comment comment){
        try{
            commentService.addComment(comment);
            return new ResponseEntity<>("Comment added.", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Something went wrong.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getComment/{id}")
    public ResponseEntity<?> getCommentByID(@PathVariable Integer id){
        try{
            Comment comment = commentService.getCommentById(id);
            return new ResponseEntity<>(comment, HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<>("No comment with that id found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getCocktailsComments/{cocktailId}")
    public ResponseEntity<?> getCommentsByCocktailID(@PathVariable Integer cocktailId){
        try{
            List<Comment> commentList = commentService.getCommentsByCocktailId(cocktailId);
            return new ResponseEntity<>(commentList, HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<>("No cocktail with that id found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteComment/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Integer id){
        try{
            commentService.deleteComment(id);
            return new ResponseEntity<>("Comment deleted", HttpStatus.OK);
        }catch(NoSuchElementException e){
            return new ResponseEntity<>("No comment with that id found", HttpStatus.NOT_FOUND);
        }
    }
}

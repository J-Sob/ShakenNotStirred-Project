package com.aplikacjebazodanowe.serverside.service;

import com.aplikacjebazodanowe.serverside.model.Comment;
import com.aplikacjebazodanowe.serverside.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImplementation implements CommentService{

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public Comment getCommentById(Integer id) {
        return commentRepository.findById(id).get();
    }

    @Override
    public void addComment(Comment comment) {
        commentRepository.save(comment);
    }

    @Override
    public void deleteComment(Integer id) {
        commentRepository.deleteById(id);
    }

    @Override
    public List<Comment> getCommentsByCocktailId(Integer cocktailId) {
        return commentRepository.getCommentsByCocktailID(cocktailId);
    }
}

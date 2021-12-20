package com.aplikacjebazodanowe.serverside.service;

import com.aplikacjebazodanowe.serverside.model.Comment;

import java.util.List;

public interface CommentService {

    public Comment getCommentById(Integer id);
    public void addComment(Comment comment);
    public void deleteComment(Integer id);
    public List<Comment> getCommentsByCocktailId(Integer cocktailId);
}

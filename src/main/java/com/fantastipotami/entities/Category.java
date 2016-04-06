package com.fantastipotami.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by alexanderhughes on 4/6/16.
 */
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue
    int id;

    @NotNull
    private String categoryStr;

    public Category() {
    }

    public Category(String category) {
        this.categoryStr = category;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategoryStr() {
        return categoryStr;
    }

    public void setCategoryStr(String categoryStr) {
        this.categoryStr = categoryStr;
    }
}
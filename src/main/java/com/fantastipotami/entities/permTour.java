package com.fantastipotami.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by alexanderhughes on 4/6/16.
 */
@Entity
@Table(name = "perm_tours")
public class PermTour {
    @Id
    @GeneratedValue
    private int id;
    @NotNull
    String description;
    String imgUrl;
    @NotNull
    private String name;

    @OneToMany(mappedBy = "permTour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PermTourLocationJoin> locations;

    public PermTour() {
    }

    public PermTour(String name, String description, String imgUrl) {
        this.description = description;
        this.imgUrl = imgUrl;
        this.name = name;
    }

    public List<PermTourLocationJoin> getLocations() {
        return locations;
    }

    public void setLocations(List<PermTourLocationJoin> locations) {
        this.locations = locations;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
}

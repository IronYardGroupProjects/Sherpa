package com.fantastipotami.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by alexanderhughes on 4/5/16.
 */
@Entity
@Table(name = "tour_loc_joins")
public class PermTourLocationJoin {
    @Id
    @GeneratedValue
    private int id;

    @NotNull
    private Boolean isVisited = false;

    @ManyToOne
    private Location location;

    @JsonIgnore
    @ManyToOne
    private PermTour permTour;

    public PermTourLocationJoin(Location location, PermTour tour) {
        this.location = location;
        this.permTour = tour;
    }

    public Boolean getIsVisited() {
        return isVisited;
    }

    public void setIsVisited(Boolean isVisited) {
        this.isVisited = isVisited;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public PermTour getPermTour() {
        return permTour;
    }

    public void setPermTour(PermTour permTour) {
        this.permTour = permTour;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

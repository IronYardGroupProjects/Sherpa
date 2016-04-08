package com.fantastipotami.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

/**
 * Created by alexanderhughes on 4/5/16.
 */
@Entity
@Table(name = "tour_loc_joins")
public class TourLocationJoin {
    @Id
    @GeneratedValue
    private int id;

    @NotNull
    private Boolean isVisited = false;

    @ManyToOne
    private Location location;

    @JsonIgnore
    @ManyToOne
    private Tour tour;

    public TourLocationJoin(Location location, Tour tour) {
        this.location = location;
        this.tour = tour;
    }

    public Boolean getisVisited() {
        return isVisited;
    }

    public void setisVisited(Boolean isVisited) {
        this.isVisited = isVisited;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Tour getTour() {
        return tour;
    }

    public void setTour(Tour tour) {
        this.tour = tour;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

package com.fantastipotami.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

/**
 * Created by alexanderhughes on 4/5/16.
 */
@Entity
@Table(name = "active_tours")
public class ActiveTour {
    @Id
    @GeneratedValue
    int id;

    @ManyToOne
    private Tour tour;

    public ActiveTour() {
    }

    public ActiveTour(Tour tour) {
        this.tour = tour;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Tour getTour() {
        return tour;
    }

    public void setTour(Tour tour) {
        this.tour = tour;
    }
}
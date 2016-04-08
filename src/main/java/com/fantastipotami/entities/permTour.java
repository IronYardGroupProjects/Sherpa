package com.fantastipotami.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by alexanderhughes on 4/6/16.
 */
@Entity
@Table(name = "tours")
public class PermTour {
    @Id
    @GeneratedValue
    private int id;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TourLocationJoin> locations;

    private String name;

    private LocalDateTime timeStamp = LocalDateTime.now();

    public PermTour() {
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(LocalDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public List<TourLocationJoin> getLocations() {
        return locations;
    }

    public void setLocations(List<TourLocationJoin> locations) {
        this.locations = locations;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

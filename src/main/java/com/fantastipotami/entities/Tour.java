package com.fantastipotami.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Created by alexanderhughes on 4/6/16.
 */
@Entity
@Table(name = "tours")
public class Tour {
    @Id
    @GeneratedValue
    int id;
    @NotNull
    private Boolean isPerm = false;
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TourLocationJoin> locations;

    private LocalDateTime timeStamp = LocalDateTime.now();

    public Tour() {
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

    public Boolean getisPerm() {
        return isPerm;
    }

    public void setisPerm(Boolean isPerm) {
        this.isPerm = isPerm;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

package com.fantastipotami.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by alexanderhughes on 4/6/16.
 */
@Entity
@Table(name = "tours")
public class Tour {
    @Id
    @GeneratedValue
    private int id;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<TourLocationJoin> locations;
    @JsonIgnore
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp = Calendar.getInstance().getTime();

    public Tour() {
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
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

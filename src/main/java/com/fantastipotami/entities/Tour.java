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
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID uuid;
    @NotNull
    private Boolean isPerm = false;
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TourLocationJoin> locations;

    private LocalDateTime timeStamp;

    public Tour() {
    }

    public Tour(LocalDateTime timeStamp) {
        /*allows creation of permanent tours in database when null
        * is passed in the constructor for the timestamp otherwise
        * LocalDateTime.now() will be passed to create temporary
        * tours which will be removed after a set interval,
        * will probably just move to a boolean for this*/
        setTimeStamp((timeStamp == null) ? null : timeStamp);
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

    public Boolean getPerm() {
        return isPerm;
    }

    public void setPerm(Boolean perm) {
        isPerm = perm;
    }
}

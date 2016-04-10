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

    @OneToMany(mappedBy = "permTour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PermTourLocationJoin> locations;

    private String name;

    public PermTour() {
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
}

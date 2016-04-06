package com.fantastipotami.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

/**
 * Created by alexanderhughes on 4/6/16.
 */
@Entity
@Table(name = "loc_cat_joins")
public class LocationCategoryJoin {
    @Id
    @GeneratedValue
    int id;

    @JsonIgnore
    @ManyToOne
    Location location;

    @ManyToOne
    Category category;

    public LocationCategoryJoin() {
    }

    public LocationCategoryJoin(Location location, Category category) {
        this.location = location;
        this.category = category;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}

package com.fantastipotami.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
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
    private int id;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TourLocationJoin> locations;
    @Temporal(TemporalType.TIMESTAMP)
    private Date date = Calendar.getInstance().getTime();
    public Tour() {
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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

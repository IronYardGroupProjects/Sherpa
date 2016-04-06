package com.fantastipotami.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

/**
 * Created by alexanderhughes on 4/5/16.
 */
@Entity
@Table(name = "tour_loc_joins")
public class TourLocationJoin {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID uuid;

    private Boolean visited = false;

    @ManyToOne
    private Detail detail;
    @ManyToOne
    private Tour tour;

    public TourLocationJoin(Detail detail, Tour tour) {
        this.detail = detail;
        this.tour = tour;
    }
}

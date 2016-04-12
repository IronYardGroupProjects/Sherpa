package com.fantastipotami.services;

import com.fantastipotami.entities.Location;
import com.fantastipotami.entities.Tour;
import com.fantastipotami.entities.TourLocationJoin;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by alexanderhughes on 4/6/16.
 */
public interface TourLocationJoinRepository extends CrudRepository<TourLocationJoin, Integer> {
    List<TourLocationJoin> findAllByTour(Tour tour);
}

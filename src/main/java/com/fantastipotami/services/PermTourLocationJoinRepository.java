package com.fantastipotami.services;

import com.fantastipotami.entities.Location;
import com.fantastipotami.entities.PermTour;
import com.fantastipotami.entities.PermTourLocationJoin;
import com.fantastipotami.entities.TourLocationJoin;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by alexanderhughes on 4/6/16.
 */
public interface PermTourLocationJoinRepository extends CrudRepository<PermTourLocationJoin, Integer> {
    List<Location> findAllByPermTour(PermTour permTour);
}

package com.fantastipotami.services;

import com.fantastipotami.entities.PermTour;
import com.fantastipotami.entities.Tour;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by alexanderhughes on 4/6/16.
 */
public interface PermTourRepository extends CrudRepository<PermTour, Integer> {
}

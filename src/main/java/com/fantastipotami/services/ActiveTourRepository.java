package com.fantastipotami.services;

import com.fantastipotami.entities.ActiveTour;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by alexanderhughes on 4/6/16.
 */
public interface ActiveTourRepository extends CrudRepository<ActiveTour, Integer> {
}

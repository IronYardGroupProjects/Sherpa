package com.fantastipotamuses.services;

import com.fantastipotamuses.entities.Tour;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by alexanderhughes on 4/6/16.
 */
public interface TourRepository extends CrudRepository<Tour, Integer> {
}

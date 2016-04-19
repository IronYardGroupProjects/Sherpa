package com.fantastipotami.services;

import com.fantastipotami.entities.Location;
import com.fantastipotami.entities.Tour;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Created by alexanderhughes on 4/6/16.
 */
public interface TourRepository extends CrudRepository<Tour, Integer> {
}

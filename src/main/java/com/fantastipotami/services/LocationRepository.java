package com.fantastipotami.services;

import com.fantastipotami.entities.Category;
import com.fantastipotami.entities.Location;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by alexanderhughes on 4/6/16.
 */
public interface LocationRepository extends CrudRepository<Location, Integer> {
    Location findFirstByName(String name);

}

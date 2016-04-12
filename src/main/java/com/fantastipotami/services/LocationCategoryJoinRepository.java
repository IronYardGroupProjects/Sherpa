package com.fantastipotami.services;

import com.fantastipotami.entities.Category;
import com.fantastipotami.entities.Location;
import com.fantastipotami.entities.LocationCategoryJoin;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by alexanderhughes on 4/6/16.
 */
public interface LocationCategoryJoinRepository extends CrudRepository<LocationCategoryJoin, Integer> {
    List<LocationCategoryJoin> findAllByCategory(Category category);
}

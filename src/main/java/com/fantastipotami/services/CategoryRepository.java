package com.fantastipotami.services;

import com.fantastipotami.entities.Category;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by alexanderhughes on 4/6/16.
 */
public interface CategoryRepository extends CrudRepository<Category, Integer> {
    Category findByCategoryStr(String categoryStr);
}

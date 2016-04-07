package com.fantastipotami.controllers;

import com.fantastipotami.entities.*;
import com.fantastipotami.services.*;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.File;
import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.util.Scanner;

/**
 * Created by alexanderhughes on 4/6/16.
 */
@RestController
public class SherpaController {

    @Autowired
    ActiveTourRepository activeTourRepo;
    @Autowired
    CategoryRepository catRepo;
    @Autowired
    LocationCategoryJoinRepository locCatRepo;
    @Autowired
    LocationRepository locRepo;
    @Autowired
    TourLocationJoinRepository tourLocRepo;
    @Autowired
    TourRepository tourRepo;

    Server dbui = null;

    //will read csv files that store our prebuilt tour data
    @PostConstruct
    public void init() throws SQLException, FileNotFoundException {
        dbui = Server.createWebServer().start();
        populateCategoriesTable("categories.csv");
        populateLocationsTable("locations.csv");
        populateToursTable("tours.csv");
    }

    @PreDestroy
    public void destroy() {
        dbui.stop();
    }


    public void populateCategoriesTable(String fileName) throws FileNotFoundException {
        File f = new File(fileName);
        Scanner fileScanner = new Scanner(f);
        fileScanner.nextLine();
        while (fileScanner.hasNext()) {
            String[] columns = fileScanner.nextLine().split(",");
            for (String cat : columns) {
                Category category = new Category(cat);
                catRepo.save(category);
            }
        }
    }

    public void populateLocationsTable(String fileName) throws FileNotFoundException {
        File f = new File(fileName);
        Scanner fileScanner = new Scanner(f);
        fileScanner.nextLine();
        while (fileScanner.hasNext()) {
            String[] columns = fileScanner.nextLine().split(",");
            Location location = new Location(columns[3], columns[4], Double.valueOf(columns[5]), Double.valueOf(columns[6]));
            if (columns[0].isEmpty()) {
                location.setImageUrl(columns[0]);
            }
            if (columns[1].isEmpty()) {
                location.setSiteUrl(columns[1]);
            }
            if (columns[2].isEmpty()) {
                location.setDescription(columns[2]);
            }
            location = locRepo.save(location);
            String[] cats = columns[7].split(";");
            for (String cat : cats) {
                LocationCategoryJoin lcj = new LocationCategoryJoin(location, catRepo.findByCategoryStr(cat));
                locCatRepo.save(lcj);
            }
        }
    }

    public void populateToursTable(String fileName) throws FileNotFoundException {
        Tour tour = new Tour();
        tour.setisPerm(true);
        tour = tourRepo.save(tour);
        File f = new File(fileName);
        Scanner fileScanner = new Scanner(f);
        fileScanner.nextLine();
        while (fileScanner.hasNext()) {
            String[] columns = fileScanner.nextLine().split(",");
            for (String id : columns) {
                Location location = locRepo.findOne(Integer.valueOf(id));
                TourLocationJoin tlj = new TourLocationJoin(location, tour);
                tourLocRepo.save(tlj);
            }
        }
    }
}

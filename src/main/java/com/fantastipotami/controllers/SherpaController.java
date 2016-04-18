package com.fantastipotami.controllers;

import com.fantastipotami.entities.GeoFence;
import com.fantastipotami.entities.*;
import com.fantastipotami.services.*;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionContext;
import java.io.File;
import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by alexanderhughes on 4/6/16.
 */
@RestController
public class SherpaController {

    @Autowired
    CategoryRepository catRepo;
    @Autowired
    LocationCategoryJoinRepository locCatRepo;
    @Autowired
    LocationRepository locRepo;
    @Autowired
    TourLocationJoinRepository tourLocRepo;
    @Autowired
    PermTourLocationJoinRepository pTourLocRepo;
    @Autowired
    TourRepository tourRepo;
    @Autowired
    PermTourRepository pTourRepo;


    //Server dbui = null;

    /**
     * reads csv files that store our prebuilt tour data
     * @throws SQLException
     * @throws FileNotFoundException
     */
    @PostConstruct
    public void init() throws SQLException, FileNotFoundException {
        //dbui = Server.createWebServer().start();
        if (catRepo.count() == 0) {
            populateCategoriesTable("categories.tsv");
        }
        if (locRepo.count() == 0) {
            populateLocationsTable("locations.tsv");
        }
        if (pTourRepo.count() == 0) {
            populatePermToursTable("permTours.tsv");
        }
    }

    /**
     * destroys database gui server
     */
    @PreDestroy
    public void destroy() {
//        dbui.stop();
    }
    /*a pseudo login, the tourId from local storage is passed to
    * recreate the session if needed*/
    /**
     * Re-join a tour that is in progress
     * @param session the session of the client hitting this route
     * @param id in client local storage passed as a path variable
     * @return locations of tour in progress
     */
    @RequestMapping(path = "/re-join/{id}", method = RequestMethod.POST)
    public ResponseEntity<Object> getTourLocs(HttpSession session, @PathVariable("id") int id) {
        session.setAttribute("tourId", id);
        List<TourLocationJoin> list = tourLocRepo.findAllByTour(tourRepo.findOne(id));
        if (list.size() > 0) {
            return new ResponseEntity<Object>(list, HttpStatus.ACCEPTED);
        }
        else return new ResponseEntity<Object>(HttpStatus.GONE);
    }

    /*Hit to get the perm tour options, they will include each
    * location with all available details, don't need to pass
    * anything*/
    @RequestMapping(path = "/perm-tour", method = RequestMethod.GET)
    public ResponseEntity<Object> getAllTours(HttpSession session) {
//        Integer id = (Integer) session.getAttribute("tourId");
//        if (id != null) {
//            return new ResponseEntity<Object>("A tour is already in progress for this user", HttpStatus.TEMPORARY_REDIRECT);
//        }
        return new ResponseEntity<Object>(pTourRepo.findAll(), HttpStatus.OK);
    }

    /**
     * for a location id returns that location from the database
     * @param id location id as a path variable
     * @return location object
     */
    @RequestMapping(path = "/location/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getCats(@PathVariable("id") int id) {
        return new ResponseEntity<Object>(locRepo.findOne(id), HttpStatus.OK);
    }

    //invalidates the session for the tour in progress, i.e. cancel/end
    @RequestMapping(path = "/tour", method = RequestMethod.DELETE)
    public ResponseEntity<Object> cancelTour(HttpSession session) {
        tourRepo.delete((Integer) session.getAttribute("tourId"));
        session.invalidate();
        return new ResponseEntity<Object>(HttpStatus.OK);
    }
    /*hit this to start a tour based on one of the pre-made tours
    * pass the id of the pre-made PermTour as a path variable*/
    @RequestMapping(path = "/tour/{id}", method = RequestMethod.POST)
    public ResponseEntity<Object> joinTour(HttpSession session, @PathVariable("id") int id) {
        PermTour permTour = pTourRepo.findOne(id);
        List<PermTourLocationJoin> locs = pTourLocRepo.findAllByPermTour(permTour);
        Tour tour = new Tour();
        tour = tourRepo.save(tour);
        for (PermTourLocationJoin loc : locs) {
            tourLocRepo.save(new TourLocationJoin(loc.getLocation(), tour));
        }
        session.setAttribute("tourId", tour.getId());
        return new ResponseEntity<Object>(tour.getId(), HttpStatus.OK);
    }
    /*hit this to create a custom tour based on 3 choices*/
    @RequestMapping(path = "/tour", method = RequestMethod.POST)
    public ResponseEntity<Object> buildTour(HttpSession session, @RequestBody HashMap map) {
        List<Integer> locs = (List<Integer>) map.get("list");
        Tour tour = new Tour();
        tour = tourRepo.save(tour);
        for (int id : locs) {
            tourLocRepo.save(new TourLocationJoin(locRepo.findOne(id), tour));
        }
        session.setAttribute("tourId", tour.getId());
        return new ResponseEntity<Object>(tour.getId(), HttpStatus.OK);
    }

    /*for updating a location during the tour as visited
    * send the location join id as pathvar and returns the tour object*/
    @RequestMapping(path = "/tour/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> updateTourLoc(@PathVariable("id") int id) {
        TourLocationJoin tlj = tourLocRepo.findOne(id);
        tlj.setIsVisited(true);
        tourLocRepo.save(tlj);
        return new ResponseEntity<Object>(HttpStatus.OK);
    }
    @RequestMapping(path = "/tour/locations", method = RequestMethod.GET)
    public ResponseEntity<Object> getLocJoins(HttpSession session) {
        int id = (Integer) session.getAttribute("tourId");
        return new ResponseEntity<Object>(tourLocRepo.findAllByTour(tourRepo.findOne(id)), HttpStatus.OK);
    }
    //choiceView stuff
    /*use this to get an array all the categories*/
    @RequestMapping(path = "/category", method = RequestMethod.GET)
    public ResponseEntity<Object> getAllCategories() {
        return new ResponseEntity<Object>(catRepo.findAll(), HttpStatus.OK);
    }
    /*give as a path variable the category id from the user selection to get
    * all the locations associated with that category*/
    @RequestMapping(path = "/category/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getToursByCat (@PathVariable("id") int id) {
        List<Location> list =
                locCatRepo.findAllByCategory(catRepo.findOne(id)).parallelStream()
                .map(LocationCategoryJoin::getLocation)
                .collect(Collectors.toCollection(ArrayList<Location>::new));
        Collections.shuffle(list);
        return new ResponseEntity<Object>(list, HttpStatus.OK);
    }

    public void populateCategoriesTable(String fileName) throws FileNotFoundException {
        File f = new File(fileName);
        Scanner fileScanner = new Scanner(f);
        fileScanner.nextLine();
        while (fileScanner.hasNext()) {
            String row = fileScanner.nextLine();
            Category category = new Category(row);
            catRepo.save(category);
        }
    }


    public void populateLocationsTable(String fileName) throws FileNotFoundException {
        File f = new File(fileName);
        Scanner fileScanner = new Scanner(f);
        fileScanner.nextLine();
        while (fileScanner.hasNext()) {
            String[] columns = fileScanner.nextLine().split("\\t");
            Location location = new Location(columns[3], columns[4], Double.valueOf(columns[5]), Double.valueOf(columns[6]));

            if (!columns[0].isEmpty()) {
                location.setImageUrl(columns[0]);
            }
            if (!columns[1].isEmpty()) {
                location.setSiteUrl(columns[1]);
            }
            if (!columns[2].isEmpty()) {
                location.setDescription(columns[2]);
            }
            String[] points = columns[8].split(",");
            location.setGeoFence(new GeoFence(Double.valueOf(points[1]), Double.valueOf(points[0]), Double.valueOf(points[3]), Double.valueOf(points[2]), Double.valueOf(points[5]), Double.valueOf(points[4]), Double.valueOf(points[7]), Double.valueOf(points[6])));
            location.getGeoFence().setLocation(location);
            location = locRepo.save(location);
            String[] cats = columns[7].split(",");
            for (String cat : cats) {
                 LocationCategoryJoin lcj = new LocationCategoryJoin(location, catRepo.findByCategoryStr(cat));
                locCatRepo.save(lcj);
            }
        }
    }
    public void populatePermToursTable(String fileName) throws FileNotFoundException {
        File f = new File(fileName);
        Scanner fileScanner = new Scanner(f);
        fileScanner.nextLine();
        while (fileScanner.hasNext()) {
            String[] columns = fileScanner.nextLine().split("\\t");
            PermTour tour = new PermTour(columns[0], columns[2], columns[3]);
            tour = pTourRepo.save(tour);
            String[] locs = columns[1].split(",");
            for (String loc : locs) {
                pTourLocRepo.save(new PermTourLocationJoin(locRepo.findOne(Integer.valueOf(loc)), tour));
            }
        }
    }
}
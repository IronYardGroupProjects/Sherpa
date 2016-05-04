package com.fantastipotami;

import com.fantastipotami.entities.Location;
import com.fantastipotami.entities.PermTour;
import com.fantastipotami.entities.Tour;
import com.fantastipotami.entities.TourLocationJoin;
import com.fantastipotami.services.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.*;
import java.util.stream.Collectors;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = SherpaApplication.class)
@WebAppConfiguration
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class HolyCitySherpaApplicationTests {

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

    @Autowired
    WebApplicationContext wap;
    @Autowired
    ObjectMapper mapper;
    MockMvc mockMvc;

    @Before
    public void before() {
        //keep this line
        mockMvc = MockMvcBuilders.webAppContextSetup(wap).build();
    }

    /**
     * unit test for /perm-tour
     * gets all prefab tours
     */
    @Test
    public void test1() throws Exception {
        List<PermTour> list = (List<PermTour>) pTourRepo.findAll();
        int properSize = list.size();

        MvcResult result =
                mockMvc.perform(
                        MockMvcRequestBuilders.get("/perm-tour")
                ).andReturn();
        ArrayList<LinkedHashMap> responseArray = mapper.readValue(result.getResponse().getContentAsString(), ArrayList.class);
        Assert.assertTrue(responseArray.size() == properSize);
    }

    /**
     * test for /tour/{id}
     * create a tour based of a prefab tour
     * @throws Exception
     */
    @Test
    public void test2() throws Exception {
        MvcResult result =
                mockMvc.perform(
                        MockMvcRequestBuilders.post("/tour/" + 1)
                ).andReturn();
        Integer responseInt = mapper.readValue(result.getResponse().getContentAsString(), Integer.class);
        Assert.assertTrue(responseInt != null);
    }

    /**
     * tests /tour
     * creates a tour based off 3 random choices from locations
     * @throws Exception
     */
    @Test
    public void test3() throws Exception {
        Random r = new Random();
        ArrayList<Location> locList = (ArrayList<Location>) locRepo.findAll();
        HashMap m = new HashMap();
        ArrayList l = new ArrayList();
        for (int i = 0; i < 3; i++) {
            l.add(locList.get(r.nextInt(locList.size())).getId());
        }
        m.put("list", l);
        String json = mapper.writeValueAsString(m);
        MvcResult result =
                mockMvc.perform(
                        MockMvcRequestBuilders.post("/tour")
                                .content(json)
                                .contentType("application/json")
                ).andReturn();
        Integer responseInt = mapper.readValue(result.getResponse().getContentAsString(), Integer.class);
        Assert.assertTrue(responseInt != null);
    }

    /**
     * test /tour/{id}
     * updates the isVisited boolean for each tour location join
     * @throws Exception
     */
    @Test
    public void test4() throws Exception {
        Tour tour = tourRepo.findOne(1);
        //functional way to ensure that all the locations of the new tour are set to not visited
        Assert.assertTrue(tour.getLocations().stream()
                .filter(TourLocationJoin::getIsVisited)
                .collect(Collectors.toCollection(ArrayList<TourLocationJoin>::new)).size() == 0);

        mockMvc.perform(
                MockMvcRequestBuilders.put("/tour/" + tour.getLocations().get(0).getId())
        );
        Assert.assertTrue(tourRepo.findOne(1).getLocations().get(0).getIsVisited());
    }

    /**
     * /tour/locations test
     * gets all locations associated with a tour id
     * @throws Exception
     */
    @Test
    public void test5() throws Exception {
        MvcResult result =
                mockMvc.perform(
                        MockMvcRequestBuilders.get("/tour/locations")
                                .sessionAttr("tourId", 1)
                ).andReturn();
        ArrayList<LinkedHashMap> responseArray = mapper.readValue(result.getResponse().getContentAsString(), ArrayList.class);
        Assert.assertTrue(responseArray.size() == responseArray.stream()
                .filter(tlj -> 1 == tourRepo.findOne(1).getLocations().stream()
                        .filter(tourLocationJoin -> (Integer) tlj.get("id") == tourLocationJoin.getId())
                        .collect(Collectors.toCollection(ArrayList::new)).size())
                .collect(Collectors.toCollection(ArrayList::new)).size());
    }

    /**
     * /re-join/{id} test
     * tests route to find the tour based off an
     * id that is stored locally
     * @throws Exception
     */
    @Test
    public void test6() throws Exception {
        MvcResult result =
            mockMvc.perform(
                    MockMvcRequestBuilders.post("/re-join/1")
            ).andReturn();
        ArrayList<LinkedHashMap> responseArray = mapper.readValue(result.getResponse().getContentAsString(), ArrayList.class);
        Assert.assertTrue(responseArray.size() == responseArray.stream()
                .filter(tlj -> 1 == tourRepo.findOne(1).getLocations().stream()
                        .filter(tourLocationJoin -> (Integer) tlj.get("id") == tourLocationJoin.getId())
                        .collect(Collectors.toCollection(ArrayList::new)).size())
                .collect(Collectors.toCollection(ArrayList::new)).size());
    }

    /**
     * tests /tour
     * cancels and deletes tour from database
     * @throws Exception
     */
    @Test
    public void test7() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/tour")
                        .sessionAttr("tourId", 1)
        );
        Assert.assertTrue(tourRepo.findOne(1) == null);
    }
//    @Test
//    public void test8() throws Exception {
//        MvcResult result =
//            mockMvc.perform(
//                    MockMvcRequestBuilders.get("/category/2")
//            ).andReturn();
//        ArrayList<LinkedHashMap> responseArray = mapper.readValue(result.getResponse().getContentAsString(), ArrayList.class);
//        Assert.assertTrue(0 == responseArray.stream()
//                .filter(loc -> {
//                    loc.get("category").getClass().getName().equals(catRepo.findOne(2));
//                })
//                .collect(Collectors.toCollection(ArrayList::new)).size());
//    }

    /**
     * tests all routes for the prefab tour path
     * up to the cancellation of the tour
     * @throws Exception
     */
    @Test
    public void testPrefab() throws Exception {
        List<PermTour> list = (List<PermTour>) pTourRepo.findAll();
        int properSize = list.size();

        MvcResult result =
                mockMvc.perform(
                        MockMvcRequestBuilders.get("/perm-tour")
                ).andReturn();
        ArrayList<LinkedHashMap> responseArray = mapper.readValue(result.getResponse().getContentAsString(), ArrayList.class);
        Assert.assertTrue(responseArray.size() == properSize);
        result =
            mockMvc.perform(
                    MockMvcRequestBuilders.post("/tour/" + responseArray.get(0).get("id"))
            ).andReturn();
        Integer responseInt = mapper.readValue(result.getResponse().getContentAsString(), Integer.class);
        Assert.assertTrue(responseInt != null);
        postCreation(responseInt);
    }

    /**
     * tests all routes for the choice path
     * up to cancellation
     * @throws Exception
     */
    @Test
    public void testChoice() throws Exception {
        Random r = new Random();
        ArrayList<Location> locList = (ArrayList<Location>) locRepo.findAll();
        HashMap m = new HashMap();
        ArrayList l = new ArrayList();
        for (int i = 0; i < 3; i++) {
            l.add(locList.get(r.nextInt(locList.size())).getId());
        }
        m.put("list", l);
        String json = mapper.writeValueAsString(m);
        MvcResult result =
                mockMvc.perform(
                        MockMvcRequestBuilders.post("/tour")
                        .content(json)
                        .contentType("application/json")
                ).andReturn();
        Integer responseInt = mapper.readValue(result.getResponse().getContentAsString(), Integer.class);
        Assert.assertTrue(responseInt != null);
        postCreation(responseInt);
    }
    public void postCreation(int responseInt) throws Exception {
        //had to change application.properties to allow me to lazy load during tests
        Tour tour = tourRepo.findOne(responseInt);
        //functional way to ensure that all the locations of the new tour are set to not visited
        Assert.assertTrue(tour.getLocations().stream()
                .filter(TourLocationJoin::getIsVisited)
                .collect(Collectors.toCollection(ArrayList<TourLocationJoin>::new)).size() == 0);

        mockMvc.perform(
                MockMvcRequestBuilders.put("/tour/" + tour.getLocations().get(0).getId())
        );
        Assert.assertTrue(tourRepo.findOne(responseInt).getLocations().get(0).getIsVisited());
        MvcResult result =
            mockMvc.perform(
                    MockMvcRequestBuilders.get("/tour/locations")
                            .sessionAttr("tourId", responseInt)
            ).andReturn();
        ArrayList<LinkedHashMap> responseArray = mapper.readValue(result.getResponse().getContentAsString(), ArrayList.class);
        Assert.assertTrue(responseArray.size() == responseArray.stream()
                .filter(tlj -> 1 == tour.getLocations().stream()
                        .filter(tourLocationJoin -> (Integer) tlj.get("id") == tourLocationJoin.getId())
                        .collect(Collectors.toCollection(ArrayList::new)).size())
                .collect(Collectors.toCollection(ArrayList::new)).size());
        result =
            mockMvc.perform(
                    MockMvcRequestBuilders.post("/re-join/" + responseInt)
            ).andReturn();
        responseArray = mapper.readValue(result.getResponse().getContentAsString(), ArrayList.class);
        Assert.assertTrue(responseArray.size() == responseArray.stream()
                .filter(tlj -> 1 == tour.getLocations().stream()
                        .filter(tourLocationJoin -> (Integer) tlj.get("id") == tourLocationJoin.getId())
                        .collect(Collectors.toCollection(ArrayList::new)).size())
                .collect(Collectors.toCollection(ArrayList::new)).size());
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/tour")
                        .sessionAttr("tourId", responseInt)
        );
        Assert.assertTrue(tourRepo.findOne(responseInt) == null);
    }
}

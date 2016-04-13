//package com.fantastipotami;
//
//import com.fantastipotami.entities.PermTour;
//import com.fantastipotami.entities.Tour;
//import com.fantastipotami.entities.TourLocationJoin;
//import com.fantastipotami.services.*;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.Assert;
//import org.junit.Before;
//import org.junit.FixMethodOrder;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.junit.runners.MethodSorters;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mock.web.MockHttpServletResponse;
//import org.springframework.test.context.web.WebAppConfiguration;
//import org.springframework.boot.test.SpringApplicationConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.web.context.WebApplicationContext;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringApplicationConfiguration(classes = SherpaApplication.class)
//@WebAppConfiguration
//@FixMethodOrder(MethodSorters.NAME_ASCENDING)
//public class HolyCitySherpaApplicationTests {
//
//    @Autowired
//    CategoryRepository catRepo;
//    @Autowired
//    LocationCategoryJoinRepository locCatRepo;
//    @Autowired
//    LocationRepository locRepo;
//    @Autowired
//    TourLocationJoinRepository tourLocRepo;
//    @Autowired
//    PermTourLocationJoinRepository pTourLocRepo;
//    @Autowired
//    TourRepository tourRepo;
//    @Autowired
//    PermTourRepository pTourRepo;
//
//    @Autowired
//    WebApplicationContext wap;
//    MockMvc mockMvc;
//
//    @Before
//    public void before() {
//        //keep this line
//        mockMvc = MockMvcBuilders.webAppContextSetup(wap).build();
//    }
//
//    /**
//     * tests get route /perm-tour
//     * @throws Exception
//     */
//	@Test
//    public void test1() throws Exception {
//        List<PermTour> list = (List<PermTour>) pTourRepo.findAll();
//        ObjectMapper mapper = new ObjectMapper();
//        int properSize = list.size();
//
//        MvcResult result =
//                mockMvc.perform(
//                    MockMvcRequestBuilders.get("/perm-tour")
//                ).andReturn();
//        ArrayList<PermTour> responseArray = mapper.readValue(result.getResponse().getContentAsString(), ArrayList.class);
//        Assert.assertTrue(responseArray.size() == properSize);
//        MvcResult result1 =
//                mockMvc.perform(
//                        MockMvcRequestBuilders.post("/tour/" + responseArray.get(1).getId())
//                ).andReturn();
//        Integer responseInt = mapper.readValue(result1.getResponse().getContentAsString(), Integer.class);
//        Assert.assertTrue(responseInt != null);
//        Tour tour = tourRepo.findOne(responseInt);
//        //functional way to ensure that all the locations of the new tour are set to not visited
//        Assert.assertTrue(tour.getLocations().stream()
//                            .filter(TourLocationJoin::getIsVisited)
//                            .collect(Collectors.toCollection(ArrayList<TourLocationJoin>::new)).size() == 0);
//        mockMvc.perform(
//                MockMvcRequestBuilders.put("/tour/" + tour.getLocations().get(0).getLocation().getId())
//        );
//        Assert.assertTrue(tour.getLocations().get(0).getIsVisited());
//        MvcResult result2 =
//                mockMvc.perform(
//                        MockMvcRequestBuilders.get("/tour")
//                        .sessionAttr("tourId", tour.getId())
//                ).andReturn();
//
//}
//
//
//}

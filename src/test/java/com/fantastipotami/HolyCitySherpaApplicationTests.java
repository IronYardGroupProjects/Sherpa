package com.fantastipotami;

import com.fantastipotami.entities.PermTour;
import com.fantastipotami.services.*;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

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
    MockMvc mockMvc;

    @Before
    public void before() {
        //keep this line
        mockMvc = MockMvcBuilders.webAppContextSetup(wap).build();
    }

	@Test
    //tests get route /perm-tour
    public void test1() throws Exception {
        List<PermTour> list = (List<PermTour>) pTourRepo.findAll();
        int properSize = list.size();

        mockMvc.perform(
                MockMvcRequestBuilders.get("/perm-tour")
                        .contentType("application/json")
        );
    }

}

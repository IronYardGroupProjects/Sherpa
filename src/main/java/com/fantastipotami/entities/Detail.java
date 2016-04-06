package com.fantastipotami.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

/**
 * Created by alexanderhughes on 4/5/16.
 */
@Entity
@Table(name = "details")
public class Detail {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID uuid;

    private String imageUrl;
    private String siteUrl;
    private String description;

    @NotNull
    private String name;
    @NotNull
    private String streetAddress;
    @NotNull
    private double latitude;
    @NotNull
    private double longitude;
    @OneToMany(mappedBy = "detail")
    List<DetailCategoryJoin> categories;
}
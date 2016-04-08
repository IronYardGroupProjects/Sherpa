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
@Table(name = "locations")
public class Location {
//    commented out, uuid seems superfluous for all my tables
//    @Id
//    @GeneratedValue(generator = "uuid2")
//    @GenericGenerator(name = "uuid2", strategy = "uuid2")
//    @Column(columnDefinition = "BINARY(16)")
//    private UUID uuid;
    @Id
    @GeneratedValue
    private int id;
    //0
    @Column
    private String imageUrl;
    //1
    @Column
    private String siteUrl;
    //2
    @Column
    private String description;
    //3
    @NotNull
    private String name;
    //4
    @NotNull
    private String streetAddress;
    //5
    @NotNull
    private double latitude;
    //6
    @NotNull
    private double longitude;
    //7
    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LocationCategoryJoin> categories;

    public Location() {
    }

    public Location(String name, String streetAddress, double latitude, double longitude) {
        this.name = name;
        this.streetAddress = streetAddress;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getSiteUrl() {
        return siteUrl;
    }

    public void setSiteUrl(String siteUrl) {
        this.siteUrl = siteUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public List<LocationCategoryJoin> getCategories() {
        return categories;
    }

    public void setCategories(List<LocationCategoryJoin> categories) {
        this.categories = categories;
    }
}
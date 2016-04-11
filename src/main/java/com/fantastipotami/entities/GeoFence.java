package com.fantastipotami.entities;

import ch.qos.logback.core.joran.spi.NoAutoStart;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Created by alexanderhughes on 4/11/16.
 */
@Entity(name = "geofences")
public class GeoFence {
    @Id
    @GeneratedValue
    int id;
    @JsonIgnore
    @OneToOne
    Location location;
    @NotNull
    double point1Lat, point1Long, point2Lat, point2Long, point3Lat, point3Long, point4Lat, point4Long;

    public GeoFence() {
    }

    public GeoFence(double point4Long, double point4Lat, double point3Long, double point3Lat, double point2Long, double point2Lat, double point1Long, double point1Lat) {
        this.point4Long = point4Long;
        this.point4Lat = point4Lat;
        this.point3Long = point3Long;
        this.point3Lat = point3Lat;
        this.point2Long = point2Long;
        this.point2Lat = point2Lat;
        this.point1Long = point1Long;
        this.point1Lat = point1Lat;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public double getPoint1Lat() {
        return point1Lat;
    }

    public void setPoint1Lat(double point1Lat) {
        this.point1Lat = point1Lat;
    }

    public double getPoint1Long() {
        return point1Long;
    }

    public void setPoint1Long(double point1Long) {
        this.point1Long = point1Long;
    }

    public double getPoint2Lat() {
        return point2Lat;
    }

    public void setPoint2Lat(double point2Lat) {
        this.point2Lat = point2Lat;
    }

    public double getPoint2Long() {
        return point2Long;
    }

    public void setPoint2Long(double point2Long) {
        this.point2Long = point2Long;
    }

    public double getPoint3Lat() {
        return point3Lat;
    }

    public void setPoint3Lat(double point3Lat) {
        this.point3Lat = point3Lat;
    }

    public double getPoint3Long() {
        return point3Long;
    }

    public void setPoint3Long(double point3Long) {
        this.point3Long = point3Long;
    }

    public double getPoint4Lat() {
        return point4Lat;
    }

    public void setPoint4Lat(double point4Lat) {
        this.point4Lat = point4Lat;
    }

    public double getPoint4Long() {
        return point4Long;
    }

    public void setPoint4Long(double point4Long) {
        this.point4Long = point4Long;
    }
}

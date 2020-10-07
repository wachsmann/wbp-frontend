package org.optaweb.vehiclerouting.plugin.persistence.route;


import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import org.optaweb.vehiclerouting.domain.Location;
import org.optaweb.vehiclerouting.plugin.persistence.passenger.PassengerEntity;

import org.optaweb.vehiclerouting.plugin.persistence.LocationEntity;
import org.optaweb.vehiclerouting.plugin.persistence.VehicleEntity;
import org.optaweb.vehiclerouting.plugin.persistence.planner.PlannerEntity;

import javax.persistence.Id;

/**
 * Point
 */

@Entity
public class RouteEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @ManyToMany(targetEntity=LocationEntity.class, fetch=FetchType.EAGER)
    @JoinColumn(name="visit_id")
    private List<LocationEntity> visits;
    public List<LocationEntity> getVisits() {return this.visits;}
    public void setVisits(List<LocationEntity> visits) {this.visits = visits;}
    
    @ManyToOne(targetEntity=VehicleEntity.class)
    private VehicleEntity vehicle;
    
    /*
    @ManyToMany(targetEntity=LocationEntity.class, fetch=FetchType.EAGER)
    @JoinColumn(name="passenger_id")
    private List<PassengerEntity> passengers;
    public List<PassengerEntity> getPassengers() {return this.passengers;}
    public void setPassengers(List<PassengerEntity> passengers) {this.passengers = passengers;}
    */
    /*
    @OneToMany(targetEntity=Route.class)
    private Set<Route> routes;
    */


    private String generalDistanceLimit;
    public String getGeneralDistanceLimit() {return this.generalDistanceLimit;}
    public void setGeneralDistanceLimit(String generalDistanceLimit) {this.generalDistanceLimit = generalDistanceLimit;}


      
}
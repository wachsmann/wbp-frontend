package org.optaweb.vehiclerouting.plugin.persistence.routing;


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
import org.optaweb.vehiclerouting.plugin.persistence.planner.PlannerEntity;

import javax.persistence.Id;

/**
 * Point
 */

@Entity
public class RoutingEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @ManyToMany(targetEntity=LocationEntity.class, fetch=FetchType.EAGER)
    @JoinColumn(name="passenger_id")
    private List<PassengerEntity> passengers;
    public List<PassengerEntity> getPassengers() {return this.passengers;}
    public void setPassengers(List<PassengerEntity> passengers) {this.passengers = passengers;}
    /*
    @OneToMany(targetEntity=Route.class)
    private Set<Route> routes;
    */
    
    @ManyToOne(targetEntity=PlannerEntity.class)
    private PlannerEntity planner;
    public PlannerEntity getPlanner() {return this.planner;}
    public void setPlanner(PlannerEntity planner) {this.planner = planner;}

    private Integer rangePoint;
    public Integer getRangePoint() {return this.rangePoint;}
    public void setRangePoint(Integer rangePoint) {this.rangePoint = rangePoint;}

    private String generalTimeLimit;
    public String getGeneralTimeLimit() {return this.generalTimeLimit;}
    public void setGeneralTimeLimit(String generalTimeLimit) {this.generalTimeLimit = generalTimeLimit;}

    
    private String generalDistanceLimit;
    public String getGeneralDistanceLimit() {return this.generalDistanceLimit;}
    public void setGeneralDistanceLimit(String generalDistanceLimit) {this.generalDistanceLimit = generalDistanceLimit;}


      
}
package org.optaweb.vehiclerouting.plugin.persistence.passenger;


import java.math.BigDecimal;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;


import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.optaweb.vehiclerouting.domain.Planner;
import org.optaweb.vehiclerouting.plugin.persistence.planner.PlannerEntity;


/**
 * Point
 */

@Entity
public class PassengerEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    
    private String matriculation;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
            this.id = id;
    }
    public String getMatriculation() {
        return this.matriculation;
    }

    public void setMatriculation(String matriculation) {
        this.matriculation = matriculation;
    }
    
    // https://wiki.openstreetmap.org/wiki/Node#Structure
    @Column(precision = 9, scale = 7)
    private BigDecimal latitude;
    @Column(precision = 10, scale = 7)
    private BigDecimal longitude;
    @ManyToOne(targetEntity=PlannerEntity.class)
    private PlannerEntity planner;
 
    protected PassengerEntity() {
        // for JPA
    }

    PassengerEntity(long id, BigDecimal latitude, BigDecimal longitude, String matriculation,PlannerEntity planner) {
        this.id = id;
        this.latitude = Objects.requireNonNull(latitude);
        this.longitude = Objects.requireNonNull(longitude);
        this.matriculation = Objects.requireNonNull(matriculation);
        this.planner = Objects.requireNonNull(planner);
    }

  
    public BigDecimal getLatitude() {
        return latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }
    public PlannerEntity getPlanner() {return this.planner;}
    public void setPlanner(PlannerEntity planner) {this.planner = planner;}
    @Override
    public String toString() {
        return "PassengerEntity{" +
                "id=" + id +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", matriculation='" + matriculation + '\'' +
                '}';
    }

  
      
}
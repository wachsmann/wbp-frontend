/*
 * Copyright 2018 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.optaweb.vehiclerouting.plugin.persistence;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.optaweb.vehiclerouting.plugin.persistence.planner.PlannerEntity;



/**
 * Persistable location.
 */
@Entity
public class LocationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    // https://wiki.openstreetmap.org/wiki/Node#Structure
    @Column(precision = 9, scale = 7)
    private BigDecimal latitude;
    @Column(precision = 10, scale = 7)
    private BigDecimal longitude;
    private String description;
    private int demand;
    @ManyToOne(targetEntity=PlannerEntity.class)
    private PlannerEntity planner;

    protected LocationEntity() {
        // for JPA
    }

    LocationEntity(long id, BigDecimal latitude, BigDecimal longitude, String description,int demand) {
        this.id = id;
        this.latitude = Objects.requireNonNull(latitude);
        this.longitude = Objects.requireNonNull(longitude);
        this.description = Objects.requireNonNull(description);
        this.demand = Objects.requireNonNull(demand);
        
        
    }

    long getId() {
        return id;
    }

    BigDecimal getLatitude() {
        return latitude;
    }

    BigDecimal getLongitude() {
        return longitude;
    }

    public PlannerEntity getPlanner() {return this.planner;}

    public void setPlanner(PlannerEntity planner) {this.planner = planner;}
    
    String getDescription() {
        return description;
    }
    int getDemand() {
        return demand;
    }
    @Override
    public String toString() {
        return "LocationEntity{" +
                "id=" + id +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", demand=" + demand +
                ", owned by ='" + planner.getUsername() + '\'' +
                '}';
    }
}
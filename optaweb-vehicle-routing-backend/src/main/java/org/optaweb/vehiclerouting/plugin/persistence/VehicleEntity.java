/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
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

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.optaweb.vehiclerouting.domain.Planner;
import org.optaweb.vehiclerouting.plugin.persistence.planner.PlannerEntity;

/**
 * Persistable vehicle.
 */
@Entity
public class VehicleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;
    private int capacity;
    @ManyToOne(targetEntity=PlannerEntity.class)
    private PlannerEntity planner;
    
    protected VehicleEntity() {
        // for JPA
    }

    public VehicleEntity(long id, String name, int capacity, PlannerEntity planner) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.planner = planner;
    }


    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getCapacity() {
        return capacity;
    }
   
    public PlannerEntity getPlanner() {return this.planner;}
    public void setPlanner(PlannerEntity planner) {this.planner = planner;}

    @Override
    public String toString() {
        return "VehicleEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", capacity=" + capacity +
                '}';
    }
}

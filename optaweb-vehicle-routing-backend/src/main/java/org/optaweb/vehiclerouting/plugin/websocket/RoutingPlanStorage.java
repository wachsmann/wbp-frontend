/*
 * Copyright 2019 Red Hat, Inc. and/or its affiliates.
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

package org.optaweb.vehiclerouting.plugin.websocket;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.optaweb.vehiclerouting.domain.Location;
import org.optaweb.vehiclerouting.domain.RoutingPlan;

/**
 * {@link RoutingPlan} representation convenient for marshalling.
 */
class RoutingPlanStorage {

    private static final Logger logger = LoggerFactory.getLogger(RoutingPlanStorage.class);
    @JsonProperty(value = "distance", required = true)
    private  long distance;
    @JsonProperty(value = "origin", required = true)
    private  _PortableLocation origin;
    @JsonProperty(value = "destiny", required = true)
    private  _PortableLocation destiny;
    @JsonProperty(value = "vehicles", required = true)
    private  List<PortableVehicle> vehicles;
    @JsonProperty(value = "visits", required = true)
    private List<_PortableLocation> visits;
    @JsonProperty(value = "routes", required = true)
    private List<_PortableLocation> routes;
    @JsonProperty(value = "radius", required = true)
    private  Integer radius;
    @JsonProperty(value = "name", required = true)
    private  String name;
    @JsonCreator
    RoutingPlanStorage(
        
        @JsonProperty(value = "name") String name,
        @JsonProperty(value = "radius") Integer radius,
        @JsonProperty(value = "distance") long distance,
        @JsonProperty(value = "origin") Map<String,String> origin,
        @JsonProperty(value = "destiny") Map<String,String> destiny,
        @JsonProperty(value = "vehicles") Map<String,String>[] vehicles,
        @JsonProperty(value = "routes") Map<String,String>[] routes,
        @JsonProperty(value = "visits") Map<String,String>[] visits
        
    ) {
        // TODO require non-null
        //this.name = name;
        //this.radius = radius;
        this.distance = Objects.requireNonNull(distance);
        /*
        _PortableLocation newOrigin = new _PortableLocation(
            new BigDecimal(origin.get("latitude")),
            new BigDecimal(origin.get("longitude")),
            0
        );
        _PortableLocation newDestiny = new _PortableLocation(
            
            new BigDecimal(destiny.get("latitude")),
            new BigDecimal(destiny.get("longitude")),
            0
        );
        ArrayList<PortableVehicle> newVehicles = new ArrayList<>();
      
        for (int i = 0; i < vehicles.length; i++) {
            PortableVehicle e = 
                new PortableVehicle(
                    vehicles[i].get("id"),
                    vehicles[i].get("name"),
                    Integer.parseInt(vehicles[i].get("capacity"))
                );

            newVehicles.add(e);
            logger.info(vehicles[i].get("capacity"));
        }
        
        
        ArrayList<_PortableLocation> newVisits = new ArrayList<>();
        
        for (int i = 0; i < visits.length; i++) {
            _PortableLocation v = 
                new _PortableLocation(
                    
                    new BigDecimal(visits[i].get("latitude")),
                    new BigDecimal(visits[i].get("longitude")),
                    Integer.parseInt(visits[i].get("demand"))
                );

                newVisits.add(v);
            logger.info(visits[i].get("demand"));
        }
        
        this.origin = newOrigin;
        this.destiny = newDestiny;
        this.vehicles = newVehicles;
        this.visits = newVisits;
        */
        /*
        this.origin = Objects.requireNonNull(origin);
        this.destiny = Objects.requireNonNull(destiny);
        this.visits = Objects.requireNonNull(visits);
        this.routes = Objects.requireNonNull(routes);*/
    }

    public long getDistance() {
        return distance;
    }
    public _PortableLocation getOrigin() {
        return origin;
    }

    public List<PortableVehicle> getVehicles() {
        return vehicles;
    }
    public Integer getRadius() {
        return radius;
    }
    public String getName() {
        return name;
    }
   
    
    public _PortableLocation getDestiny() {
        return destiny;
    }
    public List<_PortableLocation> getVisits() {
        return visits;
    }
/*
    public List<PortableRoute> getRoutes() {
        return routes;
    }
    */
    @Override
    public String toString() {
        return "PlanningLocation{" +
                "origin=" + origin.getLatitude() +
                "destiny=" + destiny.getLatitude() +
                
                ",distance=" + distance +
                
                '}';
    }
    
}

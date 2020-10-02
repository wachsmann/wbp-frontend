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

/**
 * {@link Location} representation convenient for marshalling.
 */
class PortableRouting {
    private static final Logger logger = LoggerFactory.getLogger(PortableRouting.class);
    @JsonProperty(value = "distance", required = true)
    private final long distance;
    @JsonProperty(value = "origin", required = true)
    private final _PortableLocation origin;
    @JsonProperty(value = "destiny", required = true)
    private final _PortableLocation destiny;
    @JsonProperty(value = "vehicles", required = true)
    private final List<PortableVehicle> vehicles;
    @JsonProperty(value = "visits", required = true)
    private final List<PortableLocation> visits;

    @JsonCreator
    PortableRouting(
        @JsonProperty(value = "id")  long id,
        @JsonProperty(value = "distance") long distance,
        @JsonProperty(value = "origin") Map<String,String> origin,
        @JsonProperty(value = "destiny") Map<String,String> destiny,
        @JsonProperty(value = "vehicles") Map<String,String>[] vehicles,
        @JsonProperty(value = "visits") Map<String,String>[] visits
    ) {
        // TODO require non-null
        
        this.distance = Objects.requireNonNull(distance);
        _PortableLocation newOrigin = new _PortableLocation(
            Long.parseLong(origin.get("id")),
            new BigDecimal(origin.get("latitude")),
            new BigDecimal(origin.get("longitude"))
        );
        _PortableLocation newDestiny = new _PortableLocation(
            Long.parseLong(destiny.get("id")),
            new BigDecimal(destiny.get("latitude")),
            new BigDecimal(destiny.get("longitude"))
          
        );
        ArrayList<PortableVehicle> newVehicles = new ArrayList<>();
      
        for (int i = 0; i < vehicles.length; i++) {
            PortableVehicle e = 
                new PortableVehicle(
                    Long.parseLong(vehicles[i].get("id")),
                    vehicles[i].get("name"),
                    Integer.parseInt(vehicles[i].get("capacity"))
                );

            newVehicles.add(e);
            logger.info(vehicles[i].get("capacity"));
        }
        logger.info("VISITS SIZES");
        logger.info(String.valueOf(visits.length));
        ArrayList<PortableLocation> newVisits = new ArrayList<>();
        for (int i = 0; i < visits.length; i++) {
            PortableLocation v = 
                new PortableLocation(
                    Long.parseLong(visits[i].get("id")),
                    new BigDecimal(visits[i].get("latitude")),
                    new BigDecimal(visits[i].get("longitude")),
                    visits[i].get("description"),
                    Integer.parseInt(visits[i].get("demand")),
                    Long.parseLong(visits[i].get("plannerId"))

                );

                newVisits.add(v);
            logger.info(visits[i].get("demand"));
        }
        this.origin = newOrigin;
        this.destiny = newDestiny;
        this.vehicles = newVehicles;
        this.visits = newVisits;
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
/*
    public List<PortableVehicle> getVehicles() {
        return vehicles;
    }

   
    
    public PortableLocation getDestiny() {
        return destiny;
    }
    public List<PortableLocation> getVisits() {
        return visits;
    }

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

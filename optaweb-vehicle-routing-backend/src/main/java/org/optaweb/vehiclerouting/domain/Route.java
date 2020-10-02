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

package org.optaweb.vehiclerouting.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Vehicle's itinerary (sequence of visits) and its origin. This entity cannot exist without the vehicle and the origin
 * but it's allowed to have no visits when the vehicle hasn't been assigned any (it's idle).
 * <p>
 * This entity describes part of a {@link RoutingPlan solution} of the vehicle routing problem
 * (assignment of a subset of visits to one of the vehicles).
 * It doesn't carry the data about physical tracks between adjacent visits.
 * Geographical data is held by {@link RouteWithTrack}.
 */
public class Route {

    private final Vehicle vehicle;
    
    private final Location origin;
    private final Location destiny;
    private final List<Location> visits;

    /**
     * Create a vehicle route.
     * @param vehicle the vehicle assigned to this route (not {@code null})
     * @param origin vehicle's origin (not {@code null})
     * @param visits list of visits (not {@code null})
     */
    public Route(Vehicle vehicle, Location origin, Location destiny, List<Location> visits) {
        this.vehicle = Objects.requireNonNull(vehicle);
        
        this.origin = Objects.requireNonNull(origin);
        this.destiny = Objects.requireNonNull(destiny);
        this.visits = new ArrayList<>(Objects.requireNonNull(visits));
        // TODO Probably remove this check when we have more types: new Route(origin origin, List<Visit> visits).
        //      Then visits obviously cannot contain the origin. But will we still require that no visit has the same
        //      location as the origin? (I don't think so).
        
        if (visits.contains(origin)) {
            throw new IllegalArgumentException("origin (" + origin + ") must not be one of the visits (" + visits + ")");
        }
        long uniqueVisits = visits.stream().distinct().count();
        if (uniqueVisits < visits.size()) {
            long duplicates = visits.size() - uniqueVisits;
            throw new IllegalArgumentException("Some visits have been visited multiple times (" + duplicates + ")");
        }
    }

    /**
     * The vehicle assigned to this route.
     * @return route's vehicle (never {@code null})
     */
    public Vehicle vehicle() {
        return vehicle;
    }

    /**
     * origin in which the route starts and ends.
     * @return route's origin (never {@code null})
     */
    public Location origin() {
        return origin;
    }

    /**
     * origin in which the route ends
     * @return
     */
    public Location destiny(){
        return destiny;
    }
    /**
     * List of vehicle's visits (not including the origin).
     * @return list of visits
     */
    public List<Location> visits() {
        return Collections.unmodifiableList(visits);
    }

    @Override
    public String toString() {
        return "Route{" +
                "vehicle=" + vehicle +
                ", origin=" + origin.id() +
                ", destiny=" + destiny.id() +
                ", visits=" + visits.stream().map(Location::id).collect(Collectors.toList()) +
                '}';
    }
}

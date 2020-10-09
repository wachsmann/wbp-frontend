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
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static java.util.Collections.emptyList;

public class RoutingPlan {

    private static final Logger logger = LoggerFactory.getLogger(RoutingPlan.class);

    private final Distance distance;
    private final List<Vehicle> vehicles;
    
    private final Location origin;
    private final Location destiny;
    private final List<Location> visits;
    private final List<RouteWithTrack> routes;

    /**
     * Create a routing plan.
     * @param distance the overall travel distance
     * @param vehicles all available vehicles
    
     * @param origin the start origin (may be {@code null})
     * @param destiny the end origin (may be {@code null})
     * @param visits all visits
     * @param routes routes of all vehicles
     */
    public RoutingPlan(
            Distance distance,
            List<Vehicle> vehicles,
            Location origin,
            Location destiny,
            List<Location> visits,
            List<RouteWithTrack> routes
    ) {
        this.distance = Objects.requireNonNull(distance);
        this.vehicles = new ArrayList<>(Objects.requireNonNull(vehicles));
        this.origin = origin;
        this.destiny = destiny;
        this.visits = new ArrayList<>(Objects.requireNonNull(visits));
        this.routes = new ArrayList<>(Objects.requireNonNull(routes));
        if ((origin == null /*|| origin == null || destiny == null */)) {
            if (!routes.isEmpty()) {
                throw new IllegalArgumentException("Routes must be empty when origin is null");
            }
        } else if (routes.size() != vehicles.size()) {
            throw new IllegalArgumentException(describeVehiclesRoutesInconsistency(
                    "There must be exactly one route per vehicle", vehicles, routes
            ));
        } else if (haveDifferentVehicles(vehicles, routes)) {
            throw new IllegalArgumentException(describeVehiclesRoutesInconsistency(
                    "Some routes are assigned to non-existent vehicles", vehicles, routes
            ));
        } else if (!routes.isEmpty()) {
            List<Location> visited = routes.stream()
                    .map(Route::visits)
                    .flatMap(Collection::stream)
                    .collect(Collectors.toList());
            ArrayList<Location> unvisited = new ArrayList<>(visits);
            unvisited.removeAll(visited);
            if (!unvisited.isEmpty()) {
                // This happens because we're also publishing solutions that are not fully initialized.
                // TODO decide whether this allowed or not
                logger.warn("Some visits are unvisited: {}", unvisited);
            }
            visited.removeAll(visits);
            if (!visited.isEmpty()) {
                throw new IllegalArgumentException(
                        "Some routes are going through visits that haven't been defined: " + visited
                );
            }
        }
    }

    private static boolean haveDifferentVehicles(List<Vehicle> vehicles, List<RouteWithTrack> routes) {
        return routes.stream()
                .map(Route::vehicle)
                .anyMatch(vehicle -> !vehicles.contains(vehicle));
    }

    private static String describeVehiclesRoutesInconsistency(
            String cause,
            List<Vehicle> vehicles,
            List<? extends Route> routes
    ) {
        List<Long> vehicleIdsFromRoutes = routes.stream()
                .map(route -> route.vehicle().id())
                .collect(Collectors.toList());
        return cause
                + ":\n- Vehicles (" + vehicles.size() + "): " + vehicles
                + "\n- Routes' vehicleIds (" + routes.size() + "): " + vehicleIdsFromRoutes;
    }

    /**
     * Create an empty routing plan.
     * @return empty routing plan
     */
    public static RoutingPlan empty() {
        return new RoutingPlan(Distance.ZERO, emptyList(), null,null, emptyList(), emptyList());
    }

    /**
     * Total distance traveled (sum of distances of all routes).
     * @return travel distance
     */
    public Distance distance() {
        return distance;
    }

    /**
     * All available vehicles.
     * @return all vehicles
     */
    public List<Vehicle> vehicles() {
        return Collections.unmodifiableList(vehicles);
    }

    /**
     * Routes of all vehicles in the origin. Includes empty routes of vehicles that stay in the origin.
     * @return all routes (may be empty when there is no origin or no vehicles)
     */
    public List<RouteWithTrack> routes() {
        return Collections.unmodifiableList(routes);
    }

    /**
     * All visits that are part of the routing problem.
     * @return all visits
     */
    public List<Location> visits() {
        return Collections.unmodifiableList(visits);
    }

    /**
     * The origin.
     * @return origin (may be missing)
     */
    public Optional<Location> origin() {
        return Optional.ofNullable(origin);
    }
    /**
     * The destiny.
     * @return destiny (may be missing)
     */
    public Optional<Location> destiny() {
        return Optional.ofNullable(destiny);
    }
    /**
     * Routing plan is empty when there is no origin, no vehicles and no routes.
     * @return {@code true} if the plan is empty
     */
    public boolean isEmpty() {
        // No need to check routes. No origin => no routes.
        return (origin == null /*|| origin == null || destiny == null*/)  && vehicles.isEmpty();
    }
}

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
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * Definition of the vehicle routing problem instance.
 */
public class RoutingProblem {

    private final String name;
    private final List<VehicleData> vehicles;
    private final LocationData origin;
    private final LocationData destiny;
    private final List<LocationData> visits;

    /**
     * Create routing problem instance.
     * @param name the instance name
     * @param vehicles list of vehicles (not {@code null})
     * @param origin the origin (may be {@code null} if there is no origin)
     * @param destiny the destiny (may be {@code null} if there is no destiny)
     * @param visits list of visits (not {@code null})
     */
    public RoutingProblem(
            String name,
            List<? extends VehicleData> vehicles,
            LocationData origin,
            LocationData destiny,
            List<? extends LocationData> visits
    ) {
        this.name = Objects.requireNonNull(name);
        this.vehicles = new ArrayList<>(Objects.requireNonNull(vehicles));
        this.origin = origin;
        this.destiny = destiny;
        this.visits = new ArrayList<>(Objects.requireNonNull(visits));
    }

    /**
     * Get routing problem instance name.
     * @return routing problem instance name
     */
    public String name() {
        return name;
    }



    /**
     * Get the origin.
     * @return origin (never {@code null})
     */
    public Optional<LocationData> origin() {
        return Optional.ofNullable(origin);
    }
    
    /**
     * Get the destiny.
     * @return destiny (never {@code null})
     */
    public Optional<LocationData> destiny() {
        return Optional.ofNullable(destiny);
    }
    /**
     * Get locations that should be visited.
     * @return visits
     */
    public List<LocationData> visits() {
        return visits;
    }

    /**
     * Vehicles that are part of the problem definition.
     * @return vehicles
     */
    public List<VehicleData> vehicles() {
        return vehicles;
    }
}

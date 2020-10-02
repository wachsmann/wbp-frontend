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

import java.util.List;

import org.optaweb.vehiclerouting.domain.RoutingPlan;

/**
 * {@link RoutingPlan} representation convenient for marshalling.
 */
class PortableRoutingPlan {

    private final PortableDistance distance;
    private final List<PortableVehicle> vehicles;
    private final PortableLocation origin;
    private final PortableLocation destiny;
    private final List<PortableLocation> visits;
    private final List<PortableRoute> routes;

    PortableRoutingPlan(
            PortableDistance distance,
            List<PortableVehicle> vehicles,
            PortableLocation origin,
            PortableLocation destiny,
            List<PortableLocation> visits,
            List<PortableRoute> routes
    ) {
        // TODO require non-null
        this.distance = distance;
        this.vehicles = vehicles;
        this.origin = origin;
        this.destiny = destiny;
        this.visits = visits;
        this.routes = routes;
    }

    public PortableDistance getDistance() {
        return distance;
    }

    public List<PortableVehicle> getVehicles() {
        return vehicles;
    }

    public PortableLocation getOrigin() {
        return origin;
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
    @Override
    public String toString() {
        return "PlanningLocation{" +
                "vehicles=" + vehicles.size() +
                ",visits=" + visits.size() +
                ",distance=" + distance +
                
                '}';
    }
}

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

package org.optaweb.vehiclerouting.service.passenger;

import java.util.List;
import java.util.Optional;

import org.optaweb.vehiclerouting.domain.Coordinates;
import org.optaweb.vehiclerouting.domain.Passenger;
import org.optaweb.vehiclerouting.domain.Planner;
import org.optaweb.vehiclerouting.domain.Vehicle;
import org.optaweb.vehiclerouting.domain.VehicleData;

/**
 * Defines repository operations on passengers.
 */
public interface PassengerRepository {

    /**
     * Create a passenger with a unique ID.
     * @param capacity passenger's capacity
     * @return a new passenger
     */
    Passenger createPassenger(Coordinates coordinates,String matriculation, Planner planner);

    /**
     * Create a passenger from the given data.
     * @param passengerData passenger data
     * @return a new passenger
     */

    //Vehicle createVehicle(VehicleData passengerData);

    /**
     * Get all passengers.
     * @return all passengers
     */
    List<Passenger> passengers();

    /**
     * Remove a passenger with the given ID.
     * @param id passenger's ID
     * @return the removed passenger
     */
    Passenger removePassengers(long id);

    /**
     * Remove all passengers from the repository.
     */
    void removeAll();

    /**
     * Find a passenger by its ID.
     * @param passengerId passenger's ID
     * @return an Optional containing passenger with the given ID or empty Optional if there is no passenger with such ID
     */
    Optional<Passenger> find(long passengerId);

    void update(Passenger passenger);
}

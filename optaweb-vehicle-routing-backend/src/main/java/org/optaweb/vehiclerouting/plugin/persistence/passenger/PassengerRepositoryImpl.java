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

package org.optaweb.vehiclerouting.plugin.persistence.passenger;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.optaweb.vehiclerouting.domain.Coordinates;
import org.optaweb.vehiclerouting.domain.Passenger;
import org.optaweb.vehiclerouting.domain.Planner;
import org.optaweb.vehiclerouting.plugin.persistence.planner.PlannerEntity;
import org.optaweb.vehiclerouting.service.passenger.PassengerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class PassengerRepositoryImpl implements PassengerRepository {

    private static final Logger logger = LoggerFactory.getLogger(PassengerRepositoryImpl.class);
    private final PassengerCrudRepository repository;

    @Autowired
    PassengerRepositoryImpl(PassengerCrudRepository repository) {
        this.repository = repository;
    }

    @Override
    public Passenger createPassenger(Coordinates coordinates,String matriculation, Planner planner) {
        PassengerEntity passengerEntity = repository.save(
                new PassengerEntity(
                    0, coordinates.latitude(), coordinates.longitude(),matriculation,toEntity(planner)
                )
        );
        Passenger passenger = toDomain(passengerEntity);
        logger.info("Created {}", passenger);
        return passenger;
    }



    @Override
    public void removeAll() {
        repository.deleteAll();
    }

 
    private static Planner toPlanner(final PlannerEntity planner){return new Planner(planner.getId(), planner.getUsername(),planner.getPassword());}
    private static PlannerEntity toEntity(final Planner planner){
        final PlannerEntity plannerEntity = new PlannerEntity(planner.id(),planner.username(),planner.password());
        plannerEntity.setUsername(planner.username());
        return plannerEntity;
    }
    
    private static Passenger toDomain(PassengerEntity passengerEntity) {
        return new Passenger(
                passengerEntity.getId(),
                new Coordinates(passengerEntity.getLatitude(), passengerEntity.getLongitude()),
                passengerEntity.getMatriculation(),
                toPlanner(passengerEntity.getPlanner())
                
        );
    }

    @Override
    public List<Passenger> passengers() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Passenger removePassengers(long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Optional<Passenger> find(long passengerId) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void update(Passenger passenger) {
        // TODO Auto-generated method stub

    }



}

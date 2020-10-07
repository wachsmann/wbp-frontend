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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.optaweb.vehiclerouting.domain.Planner;
import org.optaweb.vehiclerouting.domain.Vehicle;
import org.optaweb.vehiclerouting.domain.VehicleData;
import org.optaweb.vehiclerouting.domain.VehicleFactory;
import org.optaweb.vehiclerouting.plugin.persistence.planner.PlannerEntity;
import org.optaweb.vehiclerouting.service.vehicle.VehicleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class VehicleRepositoryImpl implements VehicleRepository {

    private static final Logger logger = LoggerFactory.getLogger(VehicleRepositoryImpl.class);
    private final VehicleCrudRepository repository;

    public VehicleRepositoryImpl(VehicleCrudRepository repository) {
        this.repository = repository;
    }

    @Override
    public Vehicle createVehicle(int capacity,String name, PlannerEntity planner) {
        final long id = repository.save(new VehicleEntity(0, null, capacity,planner)).getId();
        final VehicleEntity vehicleEntity = repository.save(new VehicleEntity(id, name, capacity,planner));
        return toDomain(vehicleEntity);
    }

    @Override
    public Vehicle createVehicle(final VehicleData vehicleData) {
        final VehicleEntity vehicleEntity = repository.save(new VehicleEntity(0, vehicleData.name(), vehicleData.capacity(),toEntity(vehicleData.planner())));
        return toDomain(vehicleEntity);
    }

    @Override
    public List<Vehicle> vehicles() {
        
        return StreamSupport.stream(repository.findAll().spliterator(), false)
                .map(VehicleRepositoryImpl::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Vehicle removeVehicle(final long id) {
        final Optional<VehicleEntity> optionalVehicleEntity = repository.findById(id);
        final VehicleEntity vehicleEntity = optionalVehicleEntity.orElseThrow(
                () -> new IllegalArgumentException("Vehicle{id=" + id + "} doesn't exist")
        );
        repository.deleteById(id);
        final Vehicle vehicle = toDomain(vehicleEntity);
        logger.info("Deleted {}", vehicle);
        return vehicle;
    }

    @Override
    public void removeAll() {
        repository.deleteAll();
    }

    @Override
    public Optional<Vehicle> find(final long vehicleId) {
        return repository.findById(vehicleId).map(VehicleRepositoryImpl::toDomain);
    }

    @Override
    public void update(final Vehicle vehicle) {
        repository.save(new VehicleEntity(vehicle.id(), vehicle.name(), vehicle.capacity(),toEntity(vehicle.planner())));
    }

    private static Planner toPlanner(final PlannerEntity planner){return new Planner(planner.getId(), planner.getUsername(),planner.getPassword());}
    private static PlannerEntity toEntity(final Planner planner){
        final PlannerEntity plannerEntity = new PlannerEntity(planner.id(),planner.username(),planner.password());
        plannerEntity.setUsername(planner.username());
        return plannerEntity;
    }

    private static Vehicle toDomain(final VehicleEntity vehicleEntity) {
        
        return VehicleFactory.createVehicle(
                vehicleEntity.getId(),
                vehicleEntity.getName(),
                vehicleEntity.getCapacity(),
                toPlanner(vehicleEntity.getPlanner())
        );
    }


  
}

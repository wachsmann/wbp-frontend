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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.optaweb.vehiclerouting.domain.Coordinates;
import org.optaweb.vehiclerouting.domain.RoutingPlan;
import org.optaweb.vehiclerouting.service.demo.DemoService;
import org.optaweb.vehiclerouting.service.error.ErrorEvent;
import org.optaweb.vehiclerouting.service.location.LocationService;
import org.optaweb.vehiclerouting.service.region.BoundingBox;
import org.optaweb.vehiclerouting.service.region.RegionService;
import org.optaweb.vehiclerouting.service.route.RouteListener;
import org.optaweb.vehiclerouting.service.vehicle.VehicleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

/**
 * Handles WebSocket subscriptions and STOMP messages.
 * @see WebSocketConfig
 */
@Controller
class WebSocketController {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketController.class);

    private final RouteListener routeListener;
    private final RegionService regionService;
    private final LocationService locationService;
    private final VehicleService vehicleService;
    private final DemoService demoService;
    private final ApplicationEventPublisher eventPublisher;

    @Autowired
    WebSocketController(
            RouteListener routeListener,
            RegionService regionService,
            LocationService locationService,
            VehicleService vehicleService,
            DemoService demoService,
            ApplicationEventPublisher eventPublisher
    ) {
        logger.info(demoService.toString());
        this.routeListener = routeListener;
        this.regionService = regionService;
        this.locationService = locationService;
        this.vehicleService = vehicleService;
        this.demoService = demoService;
        this.eventPublisher = eventPublisher;
    }

    @MessageExceptionHandler
    void handleException(Exception exception) {
        logger.error("Uncaught exception", exception);
        eventPublisher.publishEvent(new ErrorEvent(this, exception.toString()));
    }

    /**
     * Subscribe to server info topic.
     * @return server info
     */
    @SubscribeMapping("/serverInfo")
    ServerInfo subscribeToServerInfoTopic() {
        BoundingBox boundingBox = regionService.boundingBox();
        List<PortableCoordinates> portableBoundingBox = Arrays.asList(
                PortableCoordinates.fromCoordinates(boundingBox.getSouthWest()),
                PortableCoordinates.fromCoordinates(boundingBox.getNorthEast()));
                
        List<RoutingProblemInfo> demos = new ArrayList<RoutingProblemInfo>();
        
        /*
        demoService.demos().stream()
                .map(routingProblem -> new RoutingProblemInfo(
                        routingProblem.name(),
                        routingProblem.visits().size()))
                .collect(Collectors.toList());
        */
        return new ServerInfo(portableBoundingBox, regionService.countryCodes(), demos);
    }

    /**
     * Subscribe for updates of the VRP route.
     * @return route message
     */
    @SubscribeMapping("/route")
    PortableRoutingPlan subscribeToRouteTopic() {
        RoutingPlan routingPlan = routeListener.getBestRoutingPlan();
        return PortableRoutingPlanFactory.fromRoutingPlan(routingPlan);
    }

    /**
     * Create new location.
     * @param request new location description
     */
    @MessageMapping("/location")
    void addLocation(PortableLocation request) {
        
        locationService.createLocation(
                new Coordinates(request.getLatitude(), request.getLongitude()),
                request.getDescription(),
                request.getDemand(),
                1
        );
    }

    /**
     * Delete location.
     * @param id ID of the location to be deleted
     */
    @MessageMapping({"/location/{id}/delete"})
    void removeLocation(@DestinationVariable long id) {
        locationService.removeLocation(id);
    }

    /**
     * Create new problem.
     * @param request new location description
     */
    @MessageMapping("/planning")
    void addPlan(PortableRouting request) {
        
        
        
        Coordinates originCoordinates = new Coordinates(request.getOrigin().getLatitude(),request.getOrigin().getLongitude());
        Coordinates destinyCoordinates = new Coordinates(request.getDestiny().getLatitude(),request.getDestiny().getLongitude());
        
        // Add origin
        locationService.createLocation(originCoordinates, "",0,1);
         //add Destiny
         locationService.createLocation(destinyCoordinates, "",0,1);
        //Add Visits
        for (_PortableLocation visit : request.getVisits()) {
            
            locationService.createLocation(
                new Coordinates(visit.getLatitude(),visit.getLongitude()), "",visit.getDemand(),
                1
            );

        }
       
        
        request.getVehicles().forEach(vehicle -> vehicleService.createVehicle(1,vehicle.getCapacity(),vehicle.getName()));
       
    }
    /**
     * Store plan.
     * @param request new location description
     */
    @MessageMapping("/planning/store")
    void storePlan(RoutingPlanStorage request) {
        logger.info("PLANNING STORE ==================");
        //logger.info(request.getRadius().toString());
        
    }
    @MessageMapping("/clear")
    void clear() {
        // TODO do this in one step (=> new RoutingPlanService)
        locationService.removeAll();
        vehicleService.removeAll();
    }

    @MessageMapping({"vehicle"})
    void addVehicle(long plannerId, int capacity,String name) {
        vehicleService.createVehicle(plannerId,capacity,name);
    }

    /**
     * Delete vehicle.
     * @param id ID of the vehicle to be deleted
     */
    @MessageMapping({"/vehicle/{id}/delete"})
    void removeVehicle(@DestinationVariable long id) {
        vehicleService.removeVehicle(id);
    }

    @MessageMapping({"/vehicle/deleteAny"})
    void removeAnyVehicle() {
        vehicleService.removeAnyVehicle();
    }

    @MessageMapping({"/vehicle/{id}/capacity"})
    void changeCapacity(@DestinationVariable long id, int capacity) {
        vehicleService.changeCapacity(id, capacity);
    }
}

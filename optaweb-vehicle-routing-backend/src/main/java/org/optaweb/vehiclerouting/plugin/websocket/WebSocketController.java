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

import org.optaweb.vehiclerouting.service.error.ErrorEvent;
import org.optaweb.vehiclerouting.service.location.LocationService;
import org.optaweb.vehiclerouting.service.region.BoundingBox;

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
    private final LocationService locationService;
    private final VehicleService vehicleService;
    
    private final ApplicationEventPublisher eventPublisher;

    @Autowired
    WebSocketController(
            RouteListener routeListener,
            LocationService locationService,
            VehicleService vehicleService,
            ApplicationEventPublisher eventPublisher
    ) {
        
        this.routeListener = routeListener;
        this.locationService = locationService;
        this.vehicleService = vehicleService;
        this.eventPublisher = eventPublisher;
    }

    @MessageExceptionHandler
    void handleException(Exception exception) {
        logger.error("Uncaught exception", exception);
        eventPublisher.publishEvent(new ErrorEvent(this, exception.toString()));
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
     * Create new problem.
     * @param request new location description
     */
    @MessageMapping("/planning")
    void addPlan(PortableRouting request) {
        Coordinates originCoordinates = new Coordinates(request.getOrigin().getLatitude(),request.getOrigin().getLongitude());
        Coordinates destinyCoordinates = new Coordinates(request.getDestiny().getLatitude(),request.getDestiny().getLongitude());
        
        // Add origin
        locationService.createLocation(originCoordinates, "",0,request.getPlannerId());
         //add Destiny
         locationService.createLocation(destinyCoordinates, "",0,request.getPlannerId());
        //Add Visits
        for (_PortableLocation visit : request.getVisits()) {
            
            locationService.createLocation(
                new Coordinates(visit.getLatitude(),visit.getLongitude()), "",visit.getDemand(),request.getPlannerId()
            );

        }
        request.getVehicles().forEach(vehicle -> vehicleService.createVehicle(request.getPlannerId(),vehicle.getCapacity(),vehicle.getName()));
    }

    @MessageMapping("/clear")
    void clear() {
        locationService.removeAll();
        vehicleService.removeAll();
    }

}

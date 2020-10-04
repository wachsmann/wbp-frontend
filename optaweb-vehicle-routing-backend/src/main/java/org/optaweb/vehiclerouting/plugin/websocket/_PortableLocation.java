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
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.optaweb.vehiclerouting.domain.Location;

/**
 * {@link Location} representation convenient for marshalling.
 */
public class _PortableLocation {

    private String id;
    
    private BigDecimal latitude;
    
    private BigDecimal longitude;

    private int demand;

    _PortableLocation(
            BigDecimal latitude,
            BigDecimal longitude,
            int demand
    ) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.demand = demand;
    }

    public String getId() {
        return id;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }
    
    public void setDemand(int demand){
        this.demand = demand;
    }

    public int getDemand(){
        return demand;
    }
 

    @Override
    public String toString() {
        return "PortableLocation{" +
                "id=" + id +
                
                ", latitude=" + latitude +
                ", longitude=" + longitude +

                '}';
    }
}

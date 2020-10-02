package org.optaweb.vehiclerouting.domain;



public class Passenger extends LocationData{

    private final long id;
    private final String matriculation;
    private final Planner planner;
    
    
    public Passenger(long id, Coordinates coordinates,  String matriculation,Planner planner) {
        super(coordinates,matriculation);
        this.id = id;
        this.matriculation = matriculation;
        this.planner = planner;
    }

    /**
     * Passenger's ID.
     * @return unique ID
     */
    public long id() {
        return id;
    }
    public String matriculation(){
        return matriculation;
    }
    public Planner planner(){
        return planner;
    }

}
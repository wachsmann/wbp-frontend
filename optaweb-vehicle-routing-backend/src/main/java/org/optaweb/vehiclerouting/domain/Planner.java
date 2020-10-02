package org.optaweb.vehiclerouting.domain;

/**
 * Planner .
 */
public class Planner {

    private final long id;
    private final String username;
    private final String password;
   

    public Planner(long id, String username,String password) {
  
        this.id = id;
        this.username = username;
        this.password = password;
   
    }

    /**
     * Planner's ID.
     * @return unique ID
     */
    public long id() {
        return id;
    }
    public String username(){
        return username;
    }
    public String password(){
        return password;
    }
}
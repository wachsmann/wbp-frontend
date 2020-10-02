 package org.optaweb.vehiclerouting.plugin.persistence.planner;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import javax.persistence.Id;


/**
 * Point
 */


@Entity( name = "planner" )
public class PlannerEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;
   

   
    private String username;
    private String password;

    protected PlannerEntity() {
        // for JPA
    }
    public PlannerEntity(long id, String username,String password) {
        this.id = id;
        this.username = Objects.requireNonNull(username);
        this.password = Objects.requireNonNull(password);
   
        
        
    }
    public long getId() {
        return id;
    }
    public String getUsername() {return this.username;}
    public void setUsername(String username) {this.username = username;}


    public String getPassword() {return this.password;}
    public void setPassword(String password) {this.password = password;}

    
      
}
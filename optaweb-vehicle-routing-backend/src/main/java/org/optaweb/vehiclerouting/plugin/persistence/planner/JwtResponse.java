package org.optaweb.vehiclerouting.plugin.persistence.planner;
import java.io.Serializable;


public class JwtResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
    private final long id;
    private final String username;

    public JwtResponse(String jwttoken,long id,String username) {
        this.jwttoken = jwttoken;
        this.id = id;
        this.username = username;
    }
    public long getId() {
        return this.id;
    }
    public String getUsername() {
        return this.username;
    }
    public String getToken() {
        return this.jwttoken;
    }
}
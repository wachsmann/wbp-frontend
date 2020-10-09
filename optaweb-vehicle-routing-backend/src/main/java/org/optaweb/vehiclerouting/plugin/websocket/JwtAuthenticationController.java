package org.optaweb.vehiclerouting.plugin.websocket;

import org.optaweb.vehiclerouting.domain.Planner;
import org.optaweb.vehiclerouting.plugin.persistence.config.JwtTokenUtil;
import org.optaweb.vehiclerouting.plugin.persistence.planner.JwtPlannerDetailsService;
import org.optaweb.vehiclerouting.plugin.persistence.planner.JwtRequest;
import org.optaweb.vehiclerouting.plugin.persistence.planner.JwtResponse;
import org.optaweb.vehiclerouting.plugin.persistence.planner.PlannerCrudRepository;
import org.optaweb.vehiclerouting.plugin.persistence.planner.PlannerEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



@RestController
@CrossOrigin
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtPlannerDetailsService userDetailsService;

	@Autowired
	private PlannerCrudRepository plannerEntity;
	
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		PlannerEntity planner =  plannerEntity.findByUsername(authenticationRequest.getUsername());
		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token,planner.getId(),planner.getUsername()));
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody PlannerEntity planner) throws Exception {
		return ResponseEntity.ok(userDetailsService.save(planner));
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}
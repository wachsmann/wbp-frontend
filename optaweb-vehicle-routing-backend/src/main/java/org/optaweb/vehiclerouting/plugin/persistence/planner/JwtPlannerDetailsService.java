package org.optaweb.vehiclerouting.plugin.persistence.planner;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class JwtPlannerDetailsService implements UserDetailsService {

	@Autowired
	private PlannerCrudRepository plannerEntity;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		PlannerEntity planner = plannerEntity.findByUsername(username);
		if (planner == null) {
			throw new UsernameNotFoundException("Planner not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(planner.getUsername(), planner.getPassword(),
				new ArrayList<>());
	}

	public PlannerEntity save(PlannerEntity planner) {
		PlannerEntity newPlanner = new PlannerEntity();
		newPlanner.setUsername(planner.getUsername());
		newPlanner.setPassword(bcryptEncoder.encode(planner.getPassword()));
		return plannerEntity.save(newPlanner);
	}
}
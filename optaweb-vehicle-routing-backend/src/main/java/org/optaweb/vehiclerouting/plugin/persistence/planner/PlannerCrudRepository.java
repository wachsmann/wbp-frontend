package org.optaweb.vehiclerouting.plugin.persistence.planner;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlannerCrudRepository extends CrudRepository<PlannerEntity, Long> {
    PlannerEntity findByUsername(String username);
}
package dashboard.dashboard.service;

import org.springframework.data.repository.CrudRepository;

import dashboard.dashboard.model.Alert;

public interface AlertRepository extends CrudRepository<Alert, Long> {
}

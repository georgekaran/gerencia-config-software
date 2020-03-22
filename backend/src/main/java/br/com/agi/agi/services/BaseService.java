package br.com.agi.agi.services;

import br.com.agi.agi.models.Model;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

public abstract class BaseService<T extends Model, PK extends Serializable, R extends JpaRepository<T, PK>> {

    private R repository;

    public BaseService(R baseRepository) { this.setBaseRepository(baseRepository); }

    public T save(T entity) { return this.getBaseRepository().save(entity); }

    public <S extends T> Iterable<S> saveAll(Iterable<S> iterable) { return this.getBaseRepository().saveAll(iterable); }

    public void delete(T entity) { this.getBaseRepository().delete(entity); }

    public void deleteAll(Iterable<T> entity) { this.getBaseRepository().deleteAll(entity); }

    public Optional<T> findOne(PK id) {
        return this.getBaseRepository().findById(id);
    }

    public List<T> findAll() {
        Sort order = Sort.by(Sort.Direction.DESC, "id");
        return (List<T>) this.getBaseRepository().findAll(order);
    }

    R getBaseRepository() { return this.repository; }

    private void setBaseRepository(R baseRepository) { this.repository = baseRepository; }
}

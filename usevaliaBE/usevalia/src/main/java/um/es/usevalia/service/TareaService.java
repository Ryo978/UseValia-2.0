package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.TareaMapper;
import um.es.usevalia.mapper.TareaMapperImpl;
import um.es.usevalia.model.Tarea;
import um.es.usevalia.model.dto.TareaDTO;
import um.es.usevalia.model.enums.Categoria;
import um.es.usevalia.repository.TareaRepository;

import java.util.List;

@Service
public class TareaService {

    private TareaMapper mapper = new TareaMapperImpl();

    @Autowired
    private TareaRepository repository;

    public void deleteTarea(Long id) {
        repository.deleteById(id);
    }

    public Tarea getTarea(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void addTarea(Tarea tarea) {
        repository.save(tarea);
    }

    public void listTarea() {
        repository.findAll();
    }

    public List<TareaDTO> listByCategoria(String categoria) {
        Categoria cat = Categoria.fromString(categoria);

        List<Tarea> tareas = repository.findByCategoriaId(cat);
        return tareas.stream().map(mapper::tareaToTareaDTO).toList();
    }

    public long getTotalByCategoria(Categoria categoria) {
        return repository.getTotalByCategoria(categoria);
    }
}

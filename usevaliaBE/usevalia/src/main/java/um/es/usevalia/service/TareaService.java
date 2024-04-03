package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.TareaMapper;
import um.es.usevalia.model.Tarea;
import um.es.usevalia.model.dto.TareaDTO;
import um.es.usevalia.repository.TareaRepository;

import java.util.List;

@Service
public class TareaService {

    //TODO: confirmar si necesito un controller, o con el controller de Puntuacion es suficiente.

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
        List<Tarea> tareas = repository.findByCategoriaId(categoria);
        return tareas.stream().map(TareaMapper.INSTANCE::tareaToTareaDTO).toList();
    }
}

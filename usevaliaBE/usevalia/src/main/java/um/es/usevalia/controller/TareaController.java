package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.es.usevalia.mapper.TareaMapper;
import um.es.usevalia.mapper.TareaMapperImpl;
import um.es.usevalia.model.dto.TareaDTO;
import um.es.usevalia.service.TareaService;

import java.util.List;

@RestController
@RequestMapping("/tarea")
public class TareaController {

    @Autowired
    private TareaService tareaService;

    TareaMapper mapper = new TareaMapperImpl();

    @DeleteMapping
    @RequestMapping("/delete")
    public void deleteTarea(@RequestParam Long id) {
        tareaService.deleteTarea(id);
    }

    @GetMapping
    @RequestMapping("/get")
    public ResponseEntity<TareaDTO> getTarea(@RequestParam Long id) {
       return ResponseEntity.ok(mapper.tareaToTareaDTO(tareaService.getTarea(id)));
    }

    @PostMapping
    @RequestMapping("/add")
    public void addTarea(@RequestBody TareaDTO tareaDTO) {
        tareaService.addTarea(mapper.tareaDTOToTarea(tareaDTO));
    }

    @GetMapping
    @RequestMapping("/listByCategoria")
    public ResponseEntity<List<TareaDTO>> listByCategoria(@RequestParam String categoria) {
        return ResponseEntity.ok(tareaService.listByCategoria(categoria));
    }
    
}

package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import um.es.usevalia.mapper.TareaMapper;
import um.es.usevalia.model.dto.TareaDTO;
import um.es.usevalia.service.TareaService;

import java.util.List;

@RestController
@RequestMapping("/tarea")
public class TareaController {

    @Autowired
    private TareaService tareaService;

    @RequestMapping("/delete")
    public void deleteTarea(@RequestParam Long id) {
        tareaService.deleteTarea(id);
    }

    @RequestMapping("/get")
    public ResponseEntity<TareaDTO> getTarea(@RequestParam Long id) {
       return ResponseEntity.ok(TareaMapper.INSTANCE.tareaToTareaDTO(tareaService.getTarea(id)));
    }

    @RequestMapping("/add")
    public void addTarea(@RequestBody TareaDTO tareaDTO) {
        tareaService.addTarea(TareaMapper.INSTANCE.tareaDTOToTarea(tareaDTO));
    }

    @RequestMapping("/listByCategoria")
    public ResponseEntity<List<TareaDTO>> listByCategoria(@RequestParam String categoria) {
        return ResponseEntity.ok(tareaService.listByCategoria(categoria));
    }
}

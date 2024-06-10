package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.es.usevalia.mapper.GrupoMapper;
import um.es.usevalia.mapper.GrupoMapperImpl;
import um.es.usevalia.model.Grupo;
import um.es.usevalia.model.dto.GrupoDTO;
import um.es.usevalia.service.GrupoService;

import java.util.List;

@RestController
@RequestMapping("/grupo")
public class GrupoController {

    @Autowired
    GrupoService grupoService;

    GrupoMapper mapper = new GrupoMapperImpl();

    @PostMapping
    @RequestMapping("/add")
    public void addGrupo(@RequestBody GrupoDTO grupo){
        grupoService.saveGrupo(grupo);
    }

    @DeleteMapping
    @RequestMapping("/delete")
    public void deleteGrupo(@RequestParam Long id){
        grupoService.deleteGrupo(id);
    }

    @GetMapping
    @RequestMapping("/get")
    public ResponseEntity<GrupoDTO> getGrupo(@RequestParam Long id){
        Grupo grupo = grupoService.getGrupo(id);
        return ResponseEntity.ok(mapper.grupoToGrupoDTO(grupo));
    }

    @GetMapping
    @RequestMapping("/getByUser")
    public ResponseEntity<List<GrupoDTO>> getGruposByUser(@RequestParam Long idUser){
        List<GrupoDTO> list = grupoService.getGruposByUser(idUser);
        return ResponseEntity.ok(list);
    }

    @GetMapping
    @RequestMapping("/getNombre")
    public ResponseEntity<String> getNombreGrupo(@RequestParam Long id){
        return ResponseEntity.ok(grupoService.getGrupo(id).getNombre());
    }
}

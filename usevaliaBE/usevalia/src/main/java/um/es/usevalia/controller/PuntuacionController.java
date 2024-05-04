package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.es.usevalia.mapper.PuntuacionMapper;
import um.es.usevalia.model.Puntuacion;
import um.es.usevalia.model.dto.ImagenDTO;
import um.es.usevalia.model.dto.PuntuacionDTO;
import um.es.usevalia.service.PuntuacionService;

import java.util.List;

@RestController
@RequestMapping("/puntuacion")
public class PuntuacionController {

    @Autowired
    private PuntuacionService service;

    @GetMapping
    @RequestMapping("/listByAuditoria")
    public ResponseEntity<List<PuntuacionDTO>> listByAuditoria(@RequestParam Long auditoriaId){
        List<Puntuacion> list = service.listByAuditoria(auditoriaId);
        return ResponseEntity.ok(list.stream().map(PuntuacionMapper.INSTANCE::puntuacionToPuntuacionDTO).toList());
    }

    @PostMapping
    @RequestMapping("/add")
    public void addPuntuacion(@RequestBody PuntuacionDTO puntuacionDTO){
        service.addPuntuacion(PuntuacionMapper.INSTANCE.puntuacionDTOToPuntuacion(puntuacionDTO));
    }

    @DeleteMapping
    @RequestMapping("/delete")
    public void deletePuntuacion(@RequestBody PuntuacionDTO puntuacionDTO){
        service.deletePuntuacion(PuntuacionMapper.INSTANCE.puntuacionDTOToPuntuacion(puntuacionDTO));
    }

    @GetMapping
    @RequestMapping("/addImage")
    public void addImage(@RequestParam Long id, @RequestBody ImagenDTO imagenDTO){
        service.addImage(id, imagenDTO);
    }

    @GetMapping
    @RequestMapping("/getNamesUserByAudit")
    public ResponseEntity<List<String>> getNamesUserByAudit(@RequestParam Long auditId){
        return ResponseEntity.ok(service.getNamesUserByAudit(auditId));
    }

    @GetMapping
    @RequestMapping("/getTotalByAudit")
    public ResponseEntity<Long> getTotalByAudit(@RequestParam Long auditId){
        return ResponseEntity.ok(service.getTotalByAudit(auditId));
    }
}

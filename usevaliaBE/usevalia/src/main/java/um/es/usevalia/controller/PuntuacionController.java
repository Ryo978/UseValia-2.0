package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.es.usevalia.mapper.ImagenMapper;
import um.es.usevalia.mapper.ImagenMapperImpl;
import um.es.usevalia.mapper.PuntuacionMapper;
import um.es.usevalia.mapper.PuntuacionMapperImpl;
import um.es.usevalia.model.Imagen;
import um.es.usevalia.model.Puntuacion;
import um.es.usevalia.model.dto.ImagenDTO;
import um.es.usevalia.model.dto.PuntuacionDTO;
import um.es.usevalia.service.*;

import java.util.List;

@RestController
@RequestMapping("/puntuacion")
public class PuntuacionController {

    @Autowired
    private PuntuacionService service;

    private PuntuacionMapper mapper = new PuntuacionMapperImpl();
    private ImagenMapper imagenMapper = new ImagenMapperImpl();

    @Autowired
    UsuarioService usuarioService;
    @Autowired
    AuditoriaService auditoriaService;
    @Autowired
    DirectrizService directrizService;
    @Autowired
    TareaService tareaService;
    @Autowired
    ImagenService imagenService;

    @GetMapping
    @RequestMapping("/listByAuditoria")
    public ResponseEntity<List<PuntuacionDTO>> listByAuditoria(@RequestParam Long auditoriaId){
        List<Puntuacion> list = service.listByAuditoria(auditoriaId);
        return ResponseEntity.ok(list.stream().map(mapper::puntuacionToPuntuacionDTO).toList());
    }

    @GetMapping
    @RequestMapping("/listByUser")
    public ResponseEntity<List<PuntuacionDTO>> listByUser(@RequestParam Long userId, @RequestParam Long auditId){
        List<Puntuacion> list = service.listByUser(userId, auditId);
        return ResponseEntity.ok(list.stream().map(mapper::puntuacionToPuntuacionDTO).toList());
    }

    @GetMapping
    @RequestMapping("/listByTask")
    public ResponseEntity<List<PuntuacionDTO>> listByTask(@RequestParam Long taskId, @RequestParam Long userId, @RequestParam Long auditId){
        List<Puntuacion> list = service.listByTask(userId, taskId, auditId);
        return ResponseEntity.ok(list.stream().map(mapper::puntuacionToPuntuacionDTO).toList());
    }


    @PostMapping
    @RequestMapping("/add")
    public PuntuacionDTO addPuntuacion(@RequestBody PuntuacionDTO puntuacionDTO){
        return service.addPuntuacion(mapper.puntuacionDTOToPuntuacion(puntuacionDTO, usuarioService,
                auditoriaService, directrizService, tareaService, imagenService));
    }

    @DeleteMapping
    @RequestMapping("/delete")
    public void deletePuntuacion(@RequestBody PuntuacionDTO puntuacionDTO){
        service.deletePuntuacion(mapper.puntuacionDTOToPuntuacion(puntuacionDTO, usuarioService,
                auditoriaService, directrizService, tareaService, imagenService));
    }

    @PostMapping
    @RequestMapping("/addImage")
    public void addImage(@RequestParam Long id, @RequestBody ImagenDTO imagenDTO){
        service.addImage(id, imagenDTO);
    }

    @GetMapping
    @RequestMapping("/getImagen")
    public ResponseEntity<ImagenDTO> getImagen(@RequestParam Long idPuntuacion){
        Imagen imagen = service.getImagen(idPuntuacion);
        return ResponseEntity.ok(imagenMapper.imagenToImagenDTO(imagen));
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

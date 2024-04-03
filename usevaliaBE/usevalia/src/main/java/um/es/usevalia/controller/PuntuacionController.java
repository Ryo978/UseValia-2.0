package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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

    @RequestMapping("/listByAuditoria")
    public ResponseEntity<List<PuntuacionDTO>> listByAuditoria(@RequestParam Long auditoriaId){
        List<Puntuacion> list = service.listByAuditoria(auditoriaId);
        return ResponseEntity.ok(list.stream().map(PuntuacionMapper.INSTANCE::puntuacionToPuntuacionDTO).toList());
    }

    @RequestMapping("/add")
    public void addPuntuacion(@RequestBody PuntuacionDTO puntuacionDTO){
        service.addPuntuacion(PuntuacionMapper.INSTANCE.puntuacionDTOToPuntuacion(puntuacionDTO));
    }

    @RequestMapping("/delete")
    public void deletePuntuacion(@RequestBody PuntuacionDTO puntuacionDTO){
        service.deletePuntuacion(PuntuacionMapper.INSTANCE.puntuacionDTOToPuntuacion(puntuacionDTO));
    }

    @RequestMapping("/addImage")
    public void addImage(@RequestParam Long id, @RequestBody ImagenDTO imagenDTO){
        service.addImage(id, imagenDTO);
    }



}

package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.es.usevalia.model.Aplicacion;
import um.es.usevalia.model.dto.AplicacionDTO;
import um.es.usevalia.service.AplicacionService;

import java.util.List;

@RestController
@RequestMapping("/aplicacion")
public class AplicacionController {

    @Autowired
    AplicacionService service;

    @PostMapping
    @RequestMapping("/add")
    public void addAplicacion(@RequestBody AplicacionDTO aplicacion) {
        service.addAplicacion(aplicacion);
    }

    @DeleteMapping
    @RequestMapping("/delete")
    public void deleteAplicacion(@RequestBody AplicacionDTO aplicacion) {
        service.deleteAplicacion(aplicacion);
    }

    @GetMapping
    @RequestMapping("/list")
    public ResponseEntity<List<AplicacionDTO>> listAplicacion(){
        List<AplicacionDTO> list = service.listAplicacion();
        return ResponseEntity.ok(list);
    }

    @GetMapping
    @RequestMapping("/get")
    public ResponseEntity<AplicacionDTO> getAplicacion(@RequestParam Long aplicacionId){
        return ResponseEntity.ok(service.getAplicacionDTO(aplicacionId));
    }

    @GetMapping
    @RequestMapping("/isEditable")
    public ResponseEntity<Boolean> isEditable(@RequestParam Long aplicacionId){
        return ResponseEntity.ok(service.isEditable(aplicacionId));
    }



}

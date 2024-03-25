package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import um.es.usevalia.model.Aplicacion;
import um.es.usevalia.model.dto.AplicacionDTO;
import um.es.usevalia.service.AplicacionService;

import java.util.List;

@RestController
@RequestMapping("/aplicacion")
public class AplicacionController {

    @Autowired
    AplicacionService service;

    @RequestMapping("/add")
    public void addAplicacion(@RequestBody AplicacionDTO aplicacion) {
        service.addAplicacion(aplicacion);
    }

    @RequestMapping("/delete")
    public void deleteAplicacion(@RequestBody AplicacionDTO aplicacion) {
        service.deleteAplicacion(aplicacion);
    }

    @RequestMapping("/list")
    public ResponseEntity<List<AplicacionDTO>> listAplicacion(){
        List<AplicacionDTO> list = service.listAplicacion();
        return ResponseEntity.ok(list);
    }

}

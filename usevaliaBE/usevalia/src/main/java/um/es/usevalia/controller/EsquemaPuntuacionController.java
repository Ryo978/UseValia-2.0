package um.es.usevalia.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import um.es.usevalia.model.EsquemaPuntuacion;
import um.es.usevalia.service.EsquemaPuntuacionService;

import java.util.List;

@RestController
@RequestMapping("/esquemapuntuacion")
public class EsquemaPuntuacionController {

    @Autowired
    EsquemaPuntuacionService service;


    @RequestMapping("/list")
    public ResponseEntity<List<EsquemaPuntuacion>> listEsquemaPuntuacion() {
        return ResponseEntity.ok(service.listEsquemaPuntuacion());
    }

    @RequestMapping("/add")
    public ResponseEntity<Long> addEsquemaPuntuacion(@RequestBody EsquemaPuntuacion esquemaPuntuacion) {
        return ResponseEntity.ok(service.addEsquemaPuntuacion(esquemaPuntuacion));
    }

    @RequestMapping("/delete")
    public void deleteEsquemaPuntuacion(@RequestBody EsquemaPuntuacion esquemaPuntuacion) {
        service.deleteEsquemaPuntuacion(esquemaPuntuacion);
    }

    @RequestMapping("/get")
    public ResponseEntity<EsquemaPuntuacion> getEsquemaPuntuacion(@RequestParam Long esquemaid) {
        return ResponseEntity.ok(service.getEsquemaPuntuacion(esquemaid));
    }
}

package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import um.es.usevalia.model.dto.ValorPuntuacionDTO;
import um.es.usevalia.service.ValorPuntuacionService;

import java.util.List;

@RestController
@RequestMapping("/valorpuntuacion")
public class ValorPuntuacionController {

    @Autowired
    ValorPuntuacionService valorPuntuacionService;

    @RequestMapping("/add")
    public void addValorPuntuacion(@RequestBody ValorPuntuacionDTO valorPuntuacionDTO){
        valorPuntuacionService.addValorPuntuacion(valorPuntuacionDTO);
    }

    @RequestMapping("/delete")
    public void deleteValorPuntuacion(@RequestBody ValorPuntuacionDTO valorPuntuacionDTO){
        valorPuntuacionService.deleteValorPuntuacion(valorPuntuacionDTO);
    }

    @RequestMapping("/listbyescala")
    public ResponseEntity<List<ValorPuntuacionDTO>> listValorPuntuacionByEscala(@RequestParam int idEscala){
        List<ValorPuntuacionDTO> list = valorPuntuacionService.listValorPuntuacionByEscala(idEscala);
        return ResponseEntity.ok(list);
    }
}

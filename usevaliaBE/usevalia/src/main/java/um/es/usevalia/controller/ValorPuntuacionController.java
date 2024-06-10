package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.es.usevalia.model.dto.ValorPuntuacionDTO;
import um.es.usevalia.service.ValorPuntuacionService;

import java.util.List;

@RestController
@RequestMapping("/valorpuntuacion")
public class ValorPuntuacionController {

    @Autowired
    ValorPuntuacionService valorPuntuacionService;

    @PostMapping
    @RequestMapping("/add")
    public void addValorPuntuacion(@RequestBody ValorPuntuacionDTO valorPuntuacionDTO){
        valorPuntuacionService.addValorPuntuacion(valorPuntuacionDTO);
    }

    @PostMapping
    @RequestMapping("/multipleAdd")
    public void addMultipleValorPuntuacion(@RequestBody List<ValorPuntuacionDTO> valoresPuntuacionDTO){
        valoresPuntuacionDTO.forEach(valorPuntuacionDTO ->
                valorPuntuacionService.addValorPuntuacion(valorPuntuacionDTO));
    }
    @DeleteMapping
    @RequestMapping("/delete")
    public void deleteValorPuntuacion(@RequestBody ValorPuntuacionDTO valorPuntuacionDTO){
        valorPuntuacionService.deleteValorPuntuacion(valorPuntuacionDTO);
    }

    @DeleteMapping
    @RequestMapping("/deletebyescala")
    public void deleteValorPuntuacionByEscala(@RequestParam Long idEscala){
        valorPuntuacionService.deleteValorPuntuacionByEscala(idEscala);
    }

    @GetMapping
    @RequestMapping("/listbyescala")
    public ResponseEntity<List<ValorPuntuacionDTO>> listValorPuntuacionByEscala(@RequestParam Long idEscala){
        List<ValorPuntuacionDTO> list = valorPuntuacionService.listValorPuntuacionByEscala(idEscala);
        return ResponseEntity.ok(list);
    }

    @GetMapping
    @RequestMapping("/getByDirectriz")
    public ResponseEntity<List<ValorPuntuacionDTO>> getByDirectriz(@RequestParam Long idDirectriz){
        List<ValorPuntuacionDTO> list = valorPuntuacionService.getByDirectriz(idDirectriz);
        return ResponseEntity.ok(list);
    }
}

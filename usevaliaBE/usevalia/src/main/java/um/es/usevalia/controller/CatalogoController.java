package um.es.usevalia.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.es.usevalia.model.dto.CatalogoDTO;
import um.es.usevalia.service.CatalogoService;

import java.util.List;

@RestController
@RequestMapping("/catalogo")
public class CatalogoController {

    @Autowired
    CatalogoService service;

    @PostMapping
    @RequestMapping("/add")
    public ResponseEntity<CatalogoDTO> addCatalogo(@RequestBody CatalogoDTO catalogoDTO){
        return ResponseEntity.ok(service.addCatalogo(catalogoDTO));
    }

    @DeleteMapping
    @RequestMapping("/delete")
    public void deleteCatalogo(@RequestBody CatalogoDTO catalogoDTO){
        service.deleteCatalogo(catalogoDTO);
    }

    @GetMapping
    @RequestMapping("/list")
    public ResponseEntity<List<CatalogoDTO>> listCatalogo(){
        List<CatalogoDTO> list = service.listCatalogo();
        return ResponseEntity.ok(list);
    }

    @GetMapping
    @RequestMapping("/get")
    public ResponseEntity<CatalogoDTO> getCatalogo(@RequestParam Long catalogoId){
        return ResponseEntity.ok(service.getCatalogoDTO(catalogoId));
    }

}

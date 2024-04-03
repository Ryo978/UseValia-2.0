package um.es.usevalia.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import um.es.usevalia.model.dto.CatalogoDTO;
import um.es.usevalia.service.CatalogoService;

import java.util.List;

@RestController
@RequestMapping("/catalogo")
public class CatalogoController {

    @Autowired
    CatalogoService service;

    @RequestMapping("/add")
    public void addCatalogo(@RequestBody CatalogoDTO catalogoDTO){
        service.addCatalogo(catalogoDTO);
    }

    @RequestMapping("/delete")
    public void deleteCatalogo(@RequestBody CatalogoDTO catalogoDTO){
        service.deleteCatalogo(catalogoDTO);
    }

    @RequestMapping("/list")
    public ResponseEntity<List<CatalogoDTO>> listCatalogo(){
        List<CatalogoDTO> list = service.listCatalogo();
        return ResponseEntity.ok(list);
    }

    //TODO: Implementar el csv de catalogo (pedir los csv y todos los templates)
}

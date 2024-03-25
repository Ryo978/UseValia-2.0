package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import um.es.usevalia.model.dto.GrupoDTO;
import um.es.usevalia.service.GrupoService;

@RestController
@RequestMapping("/grupo")
public class GrupoController {

    @Autowired
    GrupoService grupoService;

    @RequestMapping("/add")
    public void addGrupo(@RequestBody GrupoDTO grupo){
        grupoService.saveGrupo(grupo);
    }

    @RequestMapping("/delete")
    public void deleteGrupo(@RequestBody GrupoDTO grupo){
        grupoService.deleteGrupo(grupo);
    }

}

package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import um.es.usevalia.model.dto.DirectrizDTO;
import um.es.usevalia.service.DirectrizService;

import java.util.List;

@RestController
@RequestMapping("/directriz")
public class DirectrizController {

    @Autowired
    private DirectrizService service;

    @RequestMapping("/listByGrupo")
    public ResponseEntity<List<DirectrizDTO>> listByGrupo(@RequestParam Long grupoid){
        List<DirectrizDTO> list = service.listByGrupo(grupoid);
        return ResponseEntity.ok(list);
    }

    @RequestMapping("/add")
    public void addDirectriz(@RequestBody DirectrizDTO directrizDTO){
        service.addDirectriz(directrizDTO);
    }
    @RequestMapping("/delete")
    public void deleteDirectriz(@RequestBody DirectrizDTO directrizDTO){
        service.deleteDirectriz(directrizDTO);
    }

    @RequestMapping("/get")
    public ResponseEntity<DirectrizDTO> getDirectriz(@RequestParam Long directrizId){
        DirectrizDTO directriz = service.getDirectrizDTO(directrizId);
        return ResponseEntity.ok(directriz);
    }

}

package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.es.usevalia.model.dto.DirectrizDTO;
import um.es.usevalia.service.DirectrizService;

import java.util.List;

@RestController
@RequestMapping("/directriz")
public class DirectrizController {

    @Autowired
    private DirectrizService service;

    @GetMapping
    @RequestMapping("/listByGrupo")
    public ResponseEntity<List<DirectrizDTO>> listByGrupo(@RequestParam Long grupoid){
        List<DirectrizDTO> list = service.listByGrupo(grupoid);
        return ResponseEntity.ok(list);
    }
    @PostMapping
    @RequestMapping("/add")
    public void addDirectriz(@RequestBody DirectrizDTO directrizDTO){
        service.addDirectriz(directrizDTO);
    }
    @PostMapping
    @RequestMapping("/multipleAdd")
    public void multipleAddDirectriz(@RequestBody List<DirectrizDTO> directrizDTOList){
        service.multipleAddDirectriz(directrizDTOList);
    }

    @DeleteMapping
    @RequestMapping("/delete")
    public void deleteDirectriz(@RequestBody DirectrizDTO directrizDTO){
        service.deleteDirectriz(directrizDTO);
    }

    @GetMapping
    @RequestMapping("/get")
    public ResponseEntity<DirectrizDTO> getDirectriz(@RequestParam Long directrizId){
        DirectrizDTO directriz = service.getDirectrizDTO(directrizId);
        return ResponseEntity.ok(directriz);
    }

}

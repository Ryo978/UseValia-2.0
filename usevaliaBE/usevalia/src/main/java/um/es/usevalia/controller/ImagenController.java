package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.es.usevalia.mapper.ImagenMapper;
import um.es.usevalia.mapper.ImagenMapperImpl;
import um.es.usevalia.model.Imagen;
import um.es.usevalia.model.dto.ImagenDTO;
import um.es.usevalia.service.ImagenService;

@RestController
@RequestMapping("/imagen")
public class ImagenController {

    @Autowired
    private ImagenService service;

    private ImagenMapper mapper = new ImagenMapperImpl();

    @PostMapping
    @RequestMapping("/add")
    public void addImagen(@RequestBody ImagenDTO imagenDTO){
        service.addImagen(mapper.imagenDTOToImagen(imagenDTO));
    }

    @DeleteMapping
    @RequestMapping("/delete")
    public void deleteImagen(@RequestBody ImagenDTO imagenDTO){
        service.deleteImagen(mapper.imagenDTOToImagen(imagenDTO));
    }

    @GetMapping
    @RequestMapping("/get")
    public ResponseEntity<ImagenDTO> getImagen(@RequestParam Long id){
        Imagen imagen = service.getImagen(id);
        return ResponseEntity.ok(mapper.imagenToImagenDTO(imagen));
    }

}

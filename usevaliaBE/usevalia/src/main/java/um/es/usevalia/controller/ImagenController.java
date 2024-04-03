package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import um.es.usevalia.mapper.ImagenMapper;
import um.es.usevalia.model.Imagen;
import um.es.usevalia.model.dto.ImagenDTO;
import um.es.usevalia.service.ImagenService;

@RestController
@RequestMapping("/imagen")
public class ImagenController {

    @Autowired
    private ImagenService service;

    @RequestMapping("/add")
    public void addImagen(@RequestBody ImagenDTO imagenDTO){
        service.addImagen(ImagenMapper.INSTANCE.imagenDTOToImagen(imagenDTO));
    }

    @RequestMapping("/delete")
    public void deleteImagen(@RequestBody ImagenDTO imagenDTO){
        service.deleteImagen(ImagenMapper.INSTANCE.imagenDTOToImagen(imagenDTO));
    }

    @RequestMapping("/get")
    public ResponseEntity<ImagenDTO> getImagen(@RequestParam Long id){
        Imagen imagen = service.getImagen(id);
        return ResponseEntity.ok(ImagenMapper.INSTANCE.imagenToImagenDTO(imagen));
    }

}

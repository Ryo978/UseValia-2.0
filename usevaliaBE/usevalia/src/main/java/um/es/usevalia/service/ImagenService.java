package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.model.Imagen;
import um.es.usevalia.repository.ImagenRepository;

@Service
public class ImagenService {

    @Autowired
    private ImagenRepository repository;
    public Imagen addImagen(Imagen imagen) {
        return repository.save(imagen);
    }

    public void deleteImagen(Imagen imagen) {
        repository.delete(imagen);
    }

    public Imagen getImagen(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Imagen getImagenByPuntuacion(Long idPuntuacion) {
        return repository.findByPuntuacionId(idPuntuacion);
    }
}

package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.ValorPuntuacionMapper;
import um.es.usevalia.mapper.ValorPuntuacionMapperImpl;
import um.es.usevalia.model.EsquemaPuntuacion;
import um.es.usevalia.model.ValorPuntuacion;
import um.es.usevalia.model.dto.ValorPuntuacionDTO;
import um.es.usevalia.repository.ValorPuntuacionRepository;

import java.util.List;

@Service
public class ValorPuntuacionService {

    @Autowired
    ValorPuntuacionRepository repository;

    @Autowired
    EsquemaPuntuacionService esquemaPuntuacionService;

    ValorPuntuacionMapper mapper = new ValorPuntuacionMapperImpl();

    public void addValorPuntuacion(ValorPuntuacionDTO valorPuntuacionDTO) {
        repository.save(mapper.valorPuntuacionDTOToValorPuntuacion(valorPuntuacionDTO, esquemaPuntuacionService));
    }

    public void deleteValorPuntuacion(ValorPuntuacionDTO valorPuntuacionDTO) {
        repository.delete(mapper.valorPuntuacionDTOToValorPuntuacion(valorPuntuacionDTO, esquemaPuntuacionService));
    }

    public List<ValorPuntuacionDTO> listValorPuntuacionByEscala(Long idEscala) {
        return repository.findByEscalaId(idEscala).stream()
                .map(mapper::valorPuntuacionToValorPuntuacionDTO).toList();
    }

    public List<ValorPuntuacion> listValoresByEscala(Long idEscala) {
        return repository.findByEscalaId(idEscala);
    }

    private ValorPuntuacion convertDTOToEntity(ValorPuntuacionDTO valorPuntuacionDTO) {
        EsquemaPuntuacion esquema =
                esquemaPuntuacionService.getEsquemaPuntuacion(valorPuntuacionDTO.getEscalaId());
        return new ValorPuntuacion(valorPuntuacionDTO.getId(), valorPuntuacionDTO.getNombre(),
                esquema, valorPuntuacionDTO.isTipo());
    }

    public void deleteValorPuntuacionByEscala(Long idEscala) {
        repository.deleteByEscalaId(idEscala);
    }

    public List<ValorPuntuacionDTO> getByDirectriz(Long idDirectriz) {
        return repository.findByDirectrizId(idDirectriz).stream()
                .map(mapper::valorPuntuacionToValorPuntuacionDTO).toList();
    }
}

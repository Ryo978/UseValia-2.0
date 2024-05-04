package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.ValorPuntuacionMapper;
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

    public void addValorPuntuacion(ValorPuntuacionDTO valorPuntuacionDTO) {
        repository.save(ValorPuntuacionMapper.INSTANCE.valorPuntuacionDTOToValorPuntuacion(valorPuntuacionDTO));
    }

    public void deleteValorPuntuacion(ValorPuntuacionDTO valorPuntuacionDTO) {
        repository.delete(ValorPuntuacionMapper.INSTANCE.valorPuntuacionDTOToValorPuntuacion(valorPuntuacionDTO));
    }

    public List<ValorPuntuacionDTO> listValorPuntuacionByEscala(Long idEscala) {
        return repository.findByEscalaId(idEscala).stream()
                .map(ValorPuntuacionMapper.INSTANCE::valorPuntuacionToValorPuntuacionDTO).toList();
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
}

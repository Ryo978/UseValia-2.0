package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.AuditoriaMapper;
import um.es.usevalia.model.Auditoria;
import um.es.usevalia.model.dto.AuditoriaDTO;
import um.es.usevalia.repository.AuditoriaRepository;

import java.util.List;

@Service
public class AuditoriaService {

    @Autowired
    AuditoriaRepository repository;

    public List<AuditoriaDTO> listAuditoria() {
        return repository.findAll().stream().map(AuditoriaMapper.INSTANCE::auditoriaToAuditoriaDTO).toList();
    }

    public void deleteAuditoria(Long id) {
        repository.deleteById(id);
    }

    public AuditoriaDTO getAuditoriaDTO(Long id) {
        return AuditoriaMapper.INSTANCE.auditoriaToAuditoriaDTO(getAuditoria(id));
    }

    public Auditoria getAuditoria(Long id) {
        return repository.findById(id).orElse(null);
    }

    public AuditoriaDTO addAuditoria(AuditoriaDTO auditoriaDTO) {
        Auditoria auditoria = AuditoriaMapper.INSTANCE.auditoriaDTOToAuditoria(auditoriaDTO);
        auditoria = repository.save(auditoria);
        auditoriaDTO.setId(auditoria.getId());
        return auditoriaDTO;
    }
}

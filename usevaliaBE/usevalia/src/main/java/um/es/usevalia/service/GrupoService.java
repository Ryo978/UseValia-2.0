package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.GrupoMapper;
import um.es.usevalia.model.Grupo;
import um.es.usevalia.model.dto.GrupoDTO;
import um.es.usevalia.repository.GrupoRepository;

import java.util.List;

@Service
public class GrupoService {
    @Autowired
    private GrupoRepository repository;

    public Grupo getGrupo(Long grupoid) {
        return repository.findById(grupoid).orElse(null);
    }

    public Grupo saveGrupo(GrupoDTO grupo) {
        return repository.save(GrupoMapper.INSTANCE.grupoDTOToGrupo(grupo));
    }

    public void deleteGrupo(GrupoDTO grupo) {
        repository.delete(GrupoMapper.INSTANCE.grupoDTOToGrupo(grupo));
    }

    public List<GrupoDTO> getGruposByUser(Long idUser){
        return repository.findByUsuarios_Id(idUser).stream().map(GrupoMapper.INSTANCE::grupoToGrupoDTO).toList();
    }



}

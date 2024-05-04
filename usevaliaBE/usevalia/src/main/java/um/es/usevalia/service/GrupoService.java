package um.es.usevalia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import um.es.usevalia.mapper.GrupoMapper;
import um.es.usevalia.model.Etiqueta;
import um.es.usevalia.model.Grupo;
import um.es.usevalia.model.dto.GrupoDTO;
import um.es.usevalia.repository.GrupoRepository;

import java.util.List;

@Service
public class GrupoService {
    @Autowired
    private GrupoRepository repository;
    private EtiquetaService etiquetaService;

    public Grupo getGrupo(Long grupoid) {
        return repository.findById(grupoid).orElse(null);
    }

    public Grupo saveGrupo(GrupoDTO grupo) {
        Grupo grupo1 = GrupoMapper.INSTANCE.grupoDTOToGrupo(grupo);
        Etiqueta et1;
        for (Etiqueta et : grupo1.getEtiquetas()){
             et1 = etiquetaService.getByValor(et.getValor());
             if (et.equals(et1))
                 et.setId(et1.getId());
        }
        return repository.save(grupo1);
    }

    public void deleteGrupo(GrupoDTO grupo) {
        repository.delete(GrupoMapper.INSTANCE.grupoDTOToGrupo(grupo));
    }

    public List<GrupoDTO> getGruposByUser(Long idUser){
        return repository.findByUsuarios_Id(idUser).stream().map(GrupoMapper.INSTANCE::grupoToGrupoDTO).toList();
    }



}

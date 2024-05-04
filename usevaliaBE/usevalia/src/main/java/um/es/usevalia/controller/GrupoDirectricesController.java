package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import um.es.usevalia.mapper.GrupoDirectricesMapper;
import um.es.usevalia.model.dto.GrupoDirectricesDTO;
import um.es.usevalia.service.GrupoDirectricesService;

import java.util.List;

@RestController
@RequestMapping("/grupoDirectrices")
public class GrupoDirectricesController {

    @Autowired
    private GrupoDirectricesService grupoDirectricesService;

    @GetMapping
    @RequestMapping("/listByCatalogo")
    public ResponseEntity<List<GrupoDirectricesDTO>> listByCatalogo(Long catalogoId){
        return ResponseEntity.ok(grupoDirectricesService.getGrupoDirectricesByCatalogo(catalogoId)
                .stream().map(GrupoDirectricesMapper.INSTANCE::grupoDirectricesToGrupoDirectricesDTO)
                .toList());
    }

    @PostMapping
    @RequestMapping("/add")
    public ResponseEntity<GrupoDirectricesDTO> addGrupoDirectrices(GrupoDirectricesDTO grupoDirectricesDTO){
        return ResponseEntity.ok(GrupoDirectricesMapper.INSTANCE.
                grupoDirectricesToGrupoDirectricesDTO(
                        grupoDirectricesService.saveGrupoDirectrices(grupoDirectricesDTO)));
    }

}

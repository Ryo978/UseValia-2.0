package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.es.usevalia.mapper.GrupoDirectricesMapper;
import um.es.usevalia.mapper.GrupoDirectricesMapperImpl;
import um.es.usevalia.model.dto.GrupoDirectricesDTO;
import um.es.usevalia.service.GrupoDirectricesService;

import java.util.List;

@RestController
@RequestMapping("/grupoDirectrices")
public class GrupoDirectricesController {

    @Autowired
    private GrupoDirectricesService grupoDirectricesService;
    private GrupoDirectricesMapper mapper = new GrupoDirectricesMapperImpl();

    @GetMapping
    @RequestMapping("/listByCatalogo")
    public ResponseEntity<List<GrupoDirectricesDTO>> listByCatalogo(@RequestParam Long catalogoId){
        return ResponseEntity.ok(grupoDirectricesService.getGrupoDirectricesByCatalogo(catalogoId)
                .stream().map(mapper::grupoDirectricesToGrupoDirectricesDTO)
                .toList());
    }

    @PostMapping
    @RequestMapping("/add")
    public ResponseEntity<GrupoDirectricesDTO> addGrupoDirectrices(@RequestBody GrupoDirectricesDTO grupoDirectricesDTO){
        return ResponseEntity.ok(mapper.
                grupoDirectricesToGrupoDirectricesDTO(
                        grupoDirectricesService.saveGrupoDirectrices(grupoDirectricesDTO)));
    }

}

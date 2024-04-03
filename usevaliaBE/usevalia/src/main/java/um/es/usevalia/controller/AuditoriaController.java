package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import um.es.usevalia.model.dto.AuditoriaDTO;
import um.es.usevalia.service.AuditoriaService;

import java.util.List;

@RestController
@RequestMapping("/auditoria")
public class AuditoriaController {

    @Autowired
    AuditoriaService service;

    @RequestMapping("/list")
    public ResponseEntity<List<AuditoriaDTO>> listAuditoria() {
        return ResponseEntity.ok(service.listAuditoria());
    }

    @RequestMapping("/delete")
    public void deleteAuditoria(@RequestParam Long id) {
        service.deleteAuditoria(id);
    }

    @RequestMapping("/get")
    public ResponseEntity<AuditoriaDTO> getAuditoria(@RequestParam Long id) {
        return ResponseEntity.ok(service.getAuditoriaDTO(id));
    }

    @RequestMapping("/add")
    public ResponseEntity<AuditoriaDTO> addAuditoria(@RequestParam AuditoriaDTO auditoriaDTO) {
        return ResponseEntity.ok(service.addAuditoria(auditoriaDTO));
    }

    //TODO: evaluación auditoria, sacar report de la auditoria.




}

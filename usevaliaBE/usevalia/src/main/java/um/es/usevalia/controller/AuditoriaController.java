package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.es.usevalia.model.dto.AuditoriaDTO;
import um.es.usevalia.service.AuditoriaService;

import java.util.List;

@RestController
@RequestMapping("/auditoria")
public class AuditoriaController {

    @Autowired
    AuditoriaService service;

    @GetMapping
    @RequestMapping("/list")
    public ResponseEntity<List<AuditoriaDTO>> listAuditoria() {
        return ResponseEntity.ok(service.listAuditoria());
    }

    @GetMapping
    @RequestMapping("/listByUser")
    public ResponseEntity<List<AuditoriaDTO>> listByUser(@RequestParam Long userId) {
        return ResponseEntity.ok(service.listByUser(userId));
    }

    @DeleteMapping
    @RequestMapping("/delete")
    public void deleteAuditoria(@RequestParam Long id) {
        service.deleteAuditoria(id);
    }

    @GetMapping
    @RequestMapping("/get")
    public ResponseEntity<AuditoriaDTO> getAuditoria(@RequestParam Long id) {
        return ResponseEntity.ok(service.getAuditoriaDTO(id));
    }

    @PostMapping
    @RequestMapping("/add")
    public ResponseEntity<AuditoriaDTO> addAuditoria(@RequestParam AuditoriaDTO auditoriaDTO) {
        return ResponseEntity.ok(service.addAuditoria(auditoriaDTO));
    }
    @GetMapping
    @RequestMapping("/getEvaluationComplete")
    public ResponseEntity<Boolean> getEvaluationComplete(@RequestParam Long id) {
        return ResponseEntity.ok(service.getEvaluationComplete(id));
    }

    @GetMapping
    @RequestMapping("/closeAudit")
    public void closeAudit(@RequestParam Long id) {
        service.closeAudit(id);
    }

    @GetMapping
    @RequestMapping("/openAudit")
    public void openAudit(@RequestParam Long id) {
        service.openAudit(id);
    }

    //TODO: evaluación auditoria, sacar report de la auditoria.




}

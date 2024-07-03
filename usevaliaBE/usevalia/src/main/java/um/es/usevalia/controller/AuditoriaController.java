package um.es.usevalia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.es.usevalia.chart.GuidelinesPieChart;
import um.es.usevalia.chart.ScoreGuidelineChart;
import um.es.usevalia.model.dto.AuditoriaDTO;
import um.es.usevalia.service.AuditoriaService;
import com.itextpdf.layout.Document;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
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
    public ResponseEntity<List<AuditoriaDTO>> listByUser(@RequestParam Long id) {
        return ResponseEntity.ok(service.listByUser(id));
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
    public ResponseEntity<AuditoriaDTO> addAuditoria(@RequestBody AuditoriaDTO auditoriaDTO) {
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

    @GetMapping
    @RequestMapping("/getAuditReport")
    public ResponseEntity<InputStreamResource> getAuditReport(@RequestParam Long id) throws FileNotFoundException {
        String filename = "Audit report.pdf";
        service.getAuditReport(id, filename);
        File file = new File(filename);

        if (!file.exists()) {
            throw new FileNotFoundException("El archivo no se ha encontrado: " + filename);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=report.pdf");

        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.length())
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @GetMapping
    @RequestMapping("/getPieChart")
    public ResponseEntity<GuidelinesPieChart> getPieChart(@RequestParam Long id) {
        return ResponseEntity.ok(service.getPieChart(id));
    }

    @GetMapping
    @RequestMapping("/getScoreChart")
    public ResponseEntity<ScoreGuidelineChart> getScoreChart(@RequestParam Long id) {
        return ResponseEntity.ok(service.getScoreChart(id));
    }


}

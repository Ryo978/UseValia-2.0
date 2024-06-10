package um.es.usevalia.report;


import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import um.es.usevalia.model.Auditoria;
import um.es.usevalia.model.Tarea;
import um.es.usevalia.model.enums.Evaluacion;
import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class AuditReport {
    private static final float[] color = {0.75f, 0.75f, 0.75f};
    private static final float[] blanco = {1f, 1f, 1f};
    public static Document createReport(Auditoria audit, AuditInformation auditInformation,
                                        List<AuditResult> auditResults, List<Tarea> tareas,
                                        boolean isPassed, String filename) throws FileNotFoundException {
        PdfDocument pdf = new PdfDocument(new PdfWriter(filename));
        Document document = new Document(pdf, PageSize.A4);
        addInformation(document, auditInformation, isPassed);
        addResultsTable(audit, document, tareas, auditResults);

        document.close();

        return document;
    }

    private static void addColoredCell(Table table, String text, Color backgroundColor) {
        Cell cell = new Cell().add(new Paragraph(text))
                .setBackgroundColor(backgroundColor)
                .setBorder(new SolidBorder(1));
        table.addCell(cell);
    }

    private static void addInformation(Document document, AuditInformation auditInformation, boolean isPassed) {
           Paragraph header = new Paragraph("AUDIT REPORT")
                    .setFontSize(20)
                    .setTextAlignment(TextAlignment.CENTER);
            document.add(header);
            // Campo fecha
            LocalDate localDate = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            String fecha = localDate.format(formatter);

            Paragraph fechaParagraph = new Paragraph(fecha)
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.RIGHT);
            document.add(fechaParagraph);


            Table informationTable = new Table(2)
                    .useAllAvailableWidth()
                    .setTextAlignment(TextAlignment.LEFT)
                    .setMarginBottom(20);


            addColoredCell(informationTable, "Name:", Color.createColorWithColorSpace(color));
            informationTable.addCell(auditInformation.getNombre())
                    .setBackgroundColor(Color.createColorWithColorSpace(blanco));
            addColoredCell(informationTable, "Evaluated App:", Color.createColorWithColorSpace(color));
            informationTable.addCell(auditInformation.getAplicacion())
                    .setBackgroundColor(Color.createColorWithColorSpace(blanco));
            addColoredCell(informationTable, "Evaluated catalog", Color.createColorWithColorSpace(color));
            informationTable.addCell(auditInformation.getCatalogo())
                    .setBackgroundColor(Color.createColorWithColorSpace(blanco));
            addColoredCell(informationTable, "Lead Auditor", Color.createColorWithColorSpace(color));;
            informationTable.addCell(auditInformation.getAuditorLider())
                    .setBackgroundColor(Color.createColorWithColorSpace(blanco));
            addColoredCell(informationTable, "Auditors", Color.createColorWithColorSpace(color));
            informationTable.addCell(auditInformation.getAuditores())
                    .setBackgroundColor(Color.createColorWithColorSpace(blanco));
            addColoredCell(informationTable, "Audit dates", Color.createColorWithColorSpace(color));
            informationTable.addCell(auditInformation.getFechaRealizacion())
                    .setBackgroundColor(Color.createColorWithColorSpace(blanco));
            addColoredCell(informationTable, "Objective", Color.createColorWithColorSpace(color));
            informationTable.addCell(auditInformation.getObjetivo())
                    .setBackgroundColor(Color.createColorWithColorSpace(blanco));
            addColoredCell(informationTable, "Output criteria", Color.createColorWithColorSpace(color));
            informationTable.addCell(auditInformation.getCriteriosSalida())
                    .setBackgroundColor(Color.createColorWithColorSpace(blanco));

            document.add(informationTable);

            Paragraph p= new Paragraph("\n");
            document.add(p);

            Table evaluationTable = new Table(1)
                    .useAllAvailableWidth()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(20);
            addColoredCell(evaluationTable, "Evaluation results", Color.createColorWithColorSpace(color));
            if (isPassed){
                evaluationTable.addCell("According to the exit criteria presented, " +
                        "the audit has been successfully completed")
                    .setBackgroundColor(Color.createColorWithColorSpace(blanco));

            } else {
                evaluationTable.addCell("According to the exit criteria presented, " +
                        "the audit has not passed the evaluation")
                        .setBackgroundColor(Color.createColorWithColorSpace(blanco));
            }

            document.add(evaluationTable);

            Table indiceResultados = new Table(1)
                    .useAllAvailableWidth()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(20)
                    .setMarginTop(20);

            indiceResultados.addCell("Results breakdown")
                .setBackgroundColor(Color.createColorWithColorSpace(color))
                .setBorder(new SolidBorder(1));

            document.add(indiceResultados)
                    .setBackgroundColor(Color.createColorWithColorSpace(blanco))
                    .setBorder(new SolidBorder(1));


    }

    private static void addResultsTable(Auditoria audit, Document document,
                                        List<Tarea> tareas, List<AuditResult> auditResults) {

        if (audit.getEvaluacion().equals(Evaluacion.TASKS)) {
            int indexTarea = 0;
            for (AuditResult auditResult : auditResults) {
                if (auditResult.getId().equals(auditResults.get(0).getId())){
                    Table resultTable = new Table(1)
                            .useAllAvailableWidth()
                            .setTextAlignment(TextAlignment.CENTER);
                    addColoredCell(resultTable, "Task: " + tareas.get(indexTarea).getNombre(),
                            Color.createColorWithColorSpace(color));
                    document.add(resultTable);
                    indexTarea++;
                }
                buildTable(document, auditResult);
            }
        } else {
            for (AuditResult auditResult : auditResults) {
                buildTable(document, auditResult);
            }
        }

    }

    private static void buildTable(Document document, AuditResult auditResult) {
        Table resultTable1 = new Table(new float[]{1, 3, 3, 1})
                .useAllAvailableWidth()
                .setTextAlignment(TextAlignment.LEFT);

        Table resultTable2 = new Table(new float[]{ 2, 3, 3})
                .useAllAvailableWidth()
                .setTextAlignment(TextAlignment.LEFT)
                .setMarginBottom(20);

        addColoredCell(resultTable1, "ID", Color.createColorWithColorSpace(color));
        addColoredCell(resultTable1, "Name", Color.createColorWithColorSpace(color));
        addColoredCell(resultTable1, "Description", Color.createColorWithColorSpace(color));
        addColoredCell(resultTable1, "Priority", Color.createColorWithColorSpace(color));
        resultTable1.addCell(auditResult.getId())
                .setBackgroundColor(Color.createColorWithColorSpace(blanco))
                .setBorder(new SolidBorder(1));
        resultTable1.addCell(auditResult.getNombre())
                .setBackgroundColor(Color.createColorWithColorSpace(blanco))
                .setBorder(new SolidBorder(1));
        resultTable1.addCell(auditResult.getDescripcion())
                .setBackgroundColor(Color.createColorWithColorSpace(blanco))
                .setBorder(new SolidBorder(1));
        resultTable1.addCell(auditResult.getPrioridad())
                .setBackgroundColor(Color.createColorWithColorSpace(blanco))
                .setBorder(new SolidBorder(1));

        addColoredCell(resultTable2, "Score", Color.createColorWithColorSpace(color));
        addColoredCell(resultTable2, "Notes", Color.createColorWithColorSpace(color));
        addColoredCell(resultTable2, "Suggestion", Color.createColorWithColorSpace(color));
        List<String> puntuaciones = auditResult.getPuntuacion();
        List<String> notas = auditResult.getNotas();
        List<String> sugerencias = auditResult.getSugerencias();
        for (int i = 0; i < puntuaciones.size(); i++) {
            resultTable2.addCell(puntuaciones.get(i))
                    .setBackgroundColor(Color.createColorWithColorSpace(blanco))
                    .setBorder(new SolidBorder(1));
            resultTable2.addCell(notas.get(i))
                    .setBackgroundColor(Color.createColorWithColorSpace(blanco))
                    .setBorder(new SolidBorder(1));
            resultTable2.addCell(sugerencias.get(i))
                    .setBackgroundColor(Color.createColorWithColorSpace(blanco))
                    .setBorder(new SolidBorder(1));
        }


        document.add(resultTable1);
        document.add(resultTable2);
        if (auditResult.getImagen() != null) {
            Table imageTable = new Table(1)
                    .useAllAvailableWidth()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(20);
            addColoredCell(imageTable, "Images", Color.createColorWithColorSpace(color));



            float margin = document.getLeftMargin() + document.getRightMargin();
            float maxWidth = PageSize.A4.getWidth() - margin;

            for (byte[] imagen : auditResult.getImagen()) {

                // Crear ImageData a partir del array de bytes
                ImageData imageData = ImageDataFactory.create(imagen);

                // Crear una imagen y añadirla a una celda de la tabla
                Image image = new Image(imageData);
                image.setMaxWidth(maxWidth);
                image.setAutoScale(true);
                imageTable.addCell(new Cell().add(image).setBorder(new SolidBorder(1)))
                        .setBackgroundColor(Color.createColorWithColorSpace(blanco))
                        .setBorder(new SolidBorder(1));

            }
            document.add(imageTable);
        }

    }

}

package um.es.usevalia.chart;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ScoreGuidelineChart {
    private List<String> data;
    private List<String> labelsData;

    private List<String> typePuntuacion;
}

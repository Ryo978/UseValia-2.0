package um.es.usevalia.chart;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class GuidelinesPieChart {
    private Long passed;
    private Long failed;

    private Long total;

}

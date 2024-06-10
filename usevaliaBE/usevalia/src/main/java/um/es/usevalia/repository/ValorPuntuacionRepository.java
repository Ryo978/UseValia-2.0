package um.es.usevalia.repository;

import org.springframework.beans.PropertyValues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import um.es.usevalia.model.ValorPuntuacion;

import java.util.Collection;
import java.util.List;

public interface ValorPuntuacionRepository extends JpaRepository<ValorPuntuacion, Long> {
    @Query("SELECT v FROM ValorPuntuacion v WHERE v.escala.id = :idEscala")
    List<ValorPuntuacion> findByEscalaId(@Param("idEscala") Long idEscala);

    @Modifying
    @Transactional
    @Query("DELETE FROM ValorPuntuacion v WHERE v.escala.id = :idEscala")
    void deleteByEscalaId(@Param("idEscala") Long idEscala);

    @Query("SELECT vp FROM ValorPuntuacion vp JOIN vp.escala ep " +
            "JOIN Directriz d ON ep = d.esquema WHERE d.id = :idDirectriz")
    List<ValorPuntuacion> findByDirectrizId(@Param("idDirectriz") Long idDirectriz);
}

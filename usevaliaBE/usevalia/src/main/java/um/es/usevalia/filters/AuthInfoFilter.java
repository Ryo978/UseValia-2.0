package um.es.usevalia.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import um.es.usevalia.utils.SecurityUtils;

import java.io.IOException;
import java.util.Arrays;

@Slf4j
@Component
public class AuthInfoFilter extends OncePerRequestFilter {
    @Value("${app.authfilter.mappedUrls}")
    String[] mappedUrls;
    private final static String AUTH_TOKEN= "xAuthToken";
    private static AntPathMatcher antPathMatcher = new AntPathMatcher();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (!Arrays.stream(mappedUrls).anyMatch(url -> {
            log.debug("ant match("+url+","+request.getServletPath()+"):"+ antPathMatcher.match(url,request.getServletPath()));
            return antPathMatcher.match(url,request.getServletPath());
        })) {
            filterChain.doFilter(request, response);
            return;
        }
        String xAuthToken= request.getHeader(AUTH_TOKEN);
        if(xAuthToken==null){
            log.error("xAuthToken is null");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "xAuthToken is null");
            return;
        }
        SecurityUtils.setXAuthToken(xAuthToken);
        filterChain.doFilter(request, response);
        SecurityUtils.getXAuthTokenTL().remove();
    }
}

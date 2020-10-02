package org.optaweb.vehiclerouting.plugin.persistence.config;

import java.util.List;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;




//@Component
@Configuration

@EnableWebSocketMessageBroker

@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class JwtRequestFilter /*extends OncePerRequestFilter*/ implements WebSocketMessageBrokerConfigurer {
    /*
    @Autowired
    private JwtPlannerDetailsService jwtUserDetailsService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    */
    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {

        registration.interceptors(new ChannelInterceptor() {

            @Override

            public Message<?> preSend(Message<?> message, MessageChannel channel) {

                StompHeaderAccessor accessor =

                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                        if (StompCommand.CONNECT.equals(accessor.getCommand())) {

                            List<String> authorization = accessor.getNativeHeader("Authorization");
                            

                            logger.debug("X-Authorization: {}", authorization);

                            //String accessToken = authorization.get(0).split(" ")[1];
                            /*
                            Jwt jwt = jwtDecoder.decode(accessToken);

                            JwtAuthenticationConverter converter = new JwtAuthenticationConverter();

                            Authentication authentication = converter.convert(jwt);

                            accessor.setUser(authentication);
                            */
        
                           
        
                        }
        
                        
              
                return message;

            }

        });

    }
    

}

package br.com.agi.agi.configurations;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
// import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * 
 * Classe de agendamentos
 */
@Configuration
@EnableScheduling
public class SchedulerConfiguration implements WebMvcConfigurer {

    Logger logger = LoggerFactory.getLogger(SchedulerConfiguration.class);

    // @Autowired
    // private EmailService emailService;


    // @Scheduled(cron = "*/5 * * * * *")
    // public void enviarEmails() {
    //     emailService.enviarEmails();
    // }

}

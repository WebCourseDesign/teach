package org.fatmansoft.teach;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;

/**
 * SpringBootSecurityJwtApplication Web 服务 主程序
 */
@SpringBootApplication
public class SpringBootSecurityJwtApplication {

    public static void main(String[] args) {
        SpringApplicationBuilder builder = new SpringApplicationBuilder(SpringBootSecurityJwtApplication.class);
        //builder.headless(false).run(args);
        builder.headless(true).run(args);
    }
    @Bean
    public CommandLineRunner commandLineRunner(){
        return (args) ->{
            //    testService.test();
        };
    }
}

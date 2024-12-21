package org.fatmansoft.teach.config;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig {
    @Bean
    public Cache <String, Object> caffeineCache() {
        Cache<String, Object> caffeineCache = Caffeine.newBuilder().expireAfterWrite(3600, TimeUnit.SECONDS).initialCapacity(1000).maximumSize(10000).build();
        caffeineCache.asMap().put("selectCourse",0);
        caffeineCache.asMap().put("selectedStudents",new ArrayList<Integer>());
        return caffeineCache;
    }
}

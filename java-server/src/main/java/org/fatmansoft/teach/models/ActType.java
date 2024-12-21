package org.fatmansoft.teach.models;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;


public enum ActType{
    // 体育活动
    ACT_SPORT,
    // 外出旅游
    @JsonEnumDefaultValue
    ACT_TOUR,
    // 文艺演出
    ACT_CULTURE,
    // 聚会
    ACT_PARTY,
    // 其他
    ACT_OTHER
}

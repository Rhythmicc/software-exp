package org.javaboy.vhr.model;

import java.io.Serializable;

public class BaiduImageBed implements Serializable {
    private Integer id;
    private String name;
    private String keyword;
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setKeyword(String url) {
        this.keyword = url;
    }

    public String getKeyword() {
        return this.keyword;
    }
}

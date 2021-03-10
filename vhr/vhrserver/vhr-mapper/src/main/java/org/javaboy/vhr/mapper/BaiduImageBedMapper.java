package org.javaboy.vhr.mapper;

import java.util.List;

import org.javaboy.vhr.model.BaiduImageBed;

public interface BaiduImageBedMapper {
    int deleteById(Integer id);

    int insert(BaiduImageBed record);

    BaiduImageBed selectById(Integer id);

    int updateById(Integer id);

    List<BaiduImageBed> getAllBaiduImages();
}
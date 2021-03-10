package org.javaboy.vhr.service;

import java.util.List;

import org.javaboy.vhr.mapper.BaiduImageBedMapper;
import org.javaboy.vhr.model.BaiduImageBed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class BaiduImageBedService {
    @Autowired
    BaiduImageBedMapper imageBedMapper;

    public List<BaiduImageBed> getAllImages() {
        return imageBedMapper.getAllBaiduImages();
    }

    public Integer addImage(BaiduImageBed image) {
        return imageBedMapper.insert(image);
    }

    public Integer deleteImageById(Integer iid) {
        return imageBedMapper.deleteById(iid);
    }
}
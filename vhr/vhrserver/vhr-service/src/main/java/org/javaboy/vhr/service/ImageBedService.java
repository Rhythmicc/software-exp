package org.javaboy.vhr.service;

import java.util.List;

import org.javaboy.vhr.mapper.ImageBedMapper;
import org.javaboy.vhr.model.ImageBed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ImageBedService {
    @Autowired
    ImageBedMapper imageBedMapper;

    public List<ImageBed> getAllImages() {
        return imageBedMapper.getAllImages();
    }

    public Integer addImage(ImageBed image) {
        return imageBedMapper.insert(image);
    }

    public Integer deleteImageById(Integer iid) {
        return imageBedMapper.deleteById(iid);
    }
}
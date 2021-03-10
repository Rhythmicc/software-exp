package org.javaboy.vhr.controller.map;

import java.util.List;

import org.javaboy.vhr.model.ImageBed;
import org.javaboy.vhr.model.RespBean;
import org.javaboy.vhr.service.ImageBedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/map/imgbed")
public class ImageBedController {
    @Autowired
    ImageBedService imageBedService;

    @GetMapping("/")
    public List<ImageBed> getAllImages() {
        return imageBedService.getAllImages();
    }

    @PostMapping("/")
    public RespBean addImage(@RequestBody ImageBed image) {
        if (imageBedService.addImage(image) == 1) {
            return RespBean.ok("添加成功!");
        } 
        return RespBean.error("添加失败!");
    }

    @DeleteMapping("/{iid}")
    public RespBean deleteImage(@PathVariable Integer iid) {
        if (imageBedService.deleteImageById(iid) == 1) {
            return RespBean.ok("删除成功!");
        }
        return RespBean.error("删除失败");
    }
}

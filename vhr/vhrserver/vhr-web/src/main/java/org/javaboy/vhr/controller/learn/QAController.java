package org.javaboy.vhr.controller.learn;

import java.util.List;

import org.javaboy.vhr.model.QA;
import org.javaboy.vhr.model.RespBean;
import org.javaboy.vhr.service.QAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/learn/question")
public class QAController {
    @Autowired
    QAService qaService;
    
    @GetMapping("/")
    public List<QA> getAllQuestions() {
        return qaService.getAllQuestions();
    }

    @PostMapping("/")
    public RespBean addQuestion(@RequestBody QA question) {
        if (qaService.addQuestion(question) == 1) {
            return RespBean.ok("添加成功!");
        }
        return RespBean.error("添加失败!");
    }

    @DeleteMapping("/{qid}")
    public RespBean deleteQuestion(@PathVariable Integer qid) {
        if (qaService.deleteQuestionById(qid) == 1) {
            return RespBean.ok("删除成功!");
        } 
        else return RespBean.error("删除失败!");
    }
}
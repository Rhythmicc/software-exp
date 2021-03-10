package org.javaboy.vhr.service;

import java.util.List;

import org.javaboy.vhr.mapper.QAMapper;
import org.javaboy.vhr.model.QA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class QAService {
    @Autowired
    QAMapper qaMapper;

    public List<QA> getAllQuestions() {
        return qaMapper.getAllQA();
    }

    public Integer addQuestion(QA image) {
        return qaMapper.insert(image);
    }

    public Integer deleteQuestionById(Integer iid) {
        return qaMapper.deleteById(iid);
    }
}
package org.javaboy.vhr.mapper;

import java.util.List;

import org.javaboy.vhr.model.QA;

public interface QAMapper {
    int deleteById(Integer id);

    int insert(QA record);

    QA selectById(Integer id);

    int updateById(Integer id);

    List<QA> getAllQA();
}
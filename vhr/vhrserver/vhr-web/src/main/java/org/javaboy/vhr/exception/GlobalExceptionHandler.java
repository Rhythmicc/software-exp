package org.javaboy.vhr.exception;

import org.javaboy.vhr.model.RespBean;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;

/**
 * @作者 江南一点雨
 * @公众号 江南一点雨
 * @微信号 a_java_boy
 * @GitHub https://github.com/lenve
 * @博客 http://wangsong.blog.csdn.net
 * @网站 http://www.javaboy.org
 * @时间 2019-10-01 16:53
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(SQLException.class)
    public RespBean sqlException(SQLException e) {
        Writer writer = new StringWriter();
        e.printStackTrace(new PrintWriter(writer));
        return RespBean.error(writer.toString());
        /*
        if (e instanceof SQLIntegrityConstraintViolationException) {
            return RespBean.error(writer.toString());
        }
        return RespBean.error(writer.toString());*/
    }
}
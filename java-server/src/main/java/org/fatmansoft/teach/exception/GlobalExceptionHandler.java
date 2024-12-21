package org.fatmansoft.teach.exception;

import lombok.extern.slf4j.Slf4j;
import org.fatmansoft.teach.payload.response.DataResponse;
import org.fatmansoft.teach.util.CommonMethod;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ServiceException.class)
    @ResponseBody
    public DataResponse serviceException(ServiceException e){
        log.error("ServiceException:{}",e.getMessage());
        return CommonMethod.getReturnMessageError(e.getMessage());
    }
}

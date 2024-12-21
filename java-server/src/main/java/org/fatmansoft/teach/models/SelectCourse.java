package org.fatmansoft.teach.models;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
@Data
public class SelectCourse implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    List<String> ids;
}

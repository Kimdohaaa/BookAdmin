package model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookDto {
	private int bno;
	private String bname;
	private String bwriter;
	private String bcompany;
	private String indate;
	private String putdate;
}

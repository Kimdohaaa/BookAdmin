package controller;

import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.dao.BookDao;
import model.dto.BookDto;

@WebServlet("/book/view")
public class ViewController extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println(">> 상세 조회 GET");
		
		int bno = Integer.parseInt(req.getParameter("bno"));
		
		BookDto bookDto = BookDao.getInstance().find(bno);
		
		ObjectMapper mapper = new ObjectMapper();
		String jsonResult = mapper.writeValueAsString(bookDto);
		
		resp.setContentType("application/json");
		resp.getWriter().print(jsonResult);
	}
}

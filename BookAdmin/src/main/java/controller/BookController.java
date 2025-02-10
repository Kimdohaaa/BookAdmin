package controller;

import java.io.IOException;
import java.util.ArrayList;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.dao.BookDao;
import model.dto.BookDto;

@WebServlet("/book")
public class BookController extends HttpServlet{

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println(">> 도서등록 POST");
		
		ObjectMapper mapper = new ObjectMapper();
		BookDto bookDto = mapper.readValue(req.getReader(), BookDto.class);
		
		boolean result = BookDao.getInstance().bookadd(bookDto);
		
		resp.setContentType("application/json");
		resp.getWriter().print(result);
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println(">> 도서 전체 출력 GET");
		
		ArrayList<BookDto> result = BookDao.getInstance().findAll();
		
		ObjectMapper mapper = new ObjectMapper();
		String jsonResult = mapper.writeValueAsString(result);
		
		resp.setContentType("application/json");
		resp.getWriter().print(jsonResult);
	}
	
	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println(">> 도서 수정 PUT");
		
		ObjectMapper mapper = new ObjectMapper();
		BookDto bookDto = mapper.readValue(req.getReader(), BookDto.class);
		
		boolean result = BookDao.getInstance().update(bookDto);
		
		resp.setContentType("application/json");
		resp.getWriter().print(result);
	}
	
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println(">> 도서 삭제 DELETE");
		
		int bno = Integer.parseInt(req.getParameter("bno"));
		
		boolean result = BookDao.getInstance().delete(bno);
		
		resp.setContentType("application/json");
		resp.getWriter().print(result);
	}

}

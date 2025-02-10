package model.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import model.dto.BookDto;


public class BookDao {
	protected Connection conn;		// DB와 연동 결과를 조작하는 인터페이스 

	private String dburl = "jdbc:mysql://localhost:3306/bookadmin"; // 연동할 DB 서버의 URL
	private String dbuser = "root"; // 연동할 DB 서버의 계정명
	private String dbpwd = "1234"; 	// 연동할 DB 서버의 비밀번호 

	public BookDao() {
		try {
			// 1. JDBC 클래스 드라이버 로드 , Class.forName() * 예외처리 try{}catch(){}
			Class.forName("com.mysql.cj.jdbc.Driver");
			// 2. 설정한 경로/계정/비밀번호 로 DB 서버 연동 시도 하고 결과를 ( 구현체 ) 반환 
			conn = DriverManager.getConnection( dburl , dbuser , dbpwd );
		}catch (Exception e) {
			System.out.println("[DB 연동 실패]" + e );
		}
	} 
	private static BookDao instance = new BookDao();
	public static BookDao getInstance() {return instance;}
	
	public boolean bookadd(BookDto bookDto) {
		try {
			String sql = "insert into book (bname, bwriter, bcompany) values (?,?,?)";
			
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, bookDto.getBname());
			ps.setString(2, bookDto.getBwriter());
			ps.setString(3, bookDto.getBcompany());
			
			int count = ps.executeUpdate();
			
			if(count == 1) {
				return true;
			}
		}catch (SQLException e) {
			System.out.println(e);
		}
		
		return false;
	}
	
	public ArrayList<BookDto> findAll() {
		ArrayList<BookDto> list = new ArrayList();
		try {
			String sql = "select * from book";
			
			PreparedStatement ps = conn.prepareStatement(sql);
			
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()){
				BookDto bookDto = new BookDto();
				
				bookDto.setBno(rs.getInt("bno"));
				bookDto.setBname(rs.getString("bname"));
				bookDto.setBwriter(rs.getString("bwriter"));
				bookDto.setBcompany(rs.getString("bcompany"));
				bookDto.setIndate(rs.getString("indate"));
				bookDto.setPutdate(rs.getString("putdate"));
				
				list.add(bookDto);
			}
		}catch (SQLException e) {
			System.out.println(e);
		}
		return list;
	}
	
	public boolean update(BookDto bookDto) {
		try {
			String sql = "update book set bname =?, bwriter=?, bcompany= ? , putdate=now() where bno=?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, bookDto.getBname());
			ps.setString(2, bookDto.getBwriter());
			ps.setString(3, bookDto.getBcompany());
			ps.setInt(4, bookDto.getBno());
			
			int count = ps.executeUpdate();
			
			if(count == 1) {
				return true;
			}
		}catch (SQLException e) {
			System.out.println(e);
		}
		return false;
	}
	
	public boolean delete(int bno) {
		try {
			String sql = "delete from book where bno=?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, bno);
			
			int count = ps.executeUpdate();
			
			if(count == 1) {
				return true;
			}
		}catch (SQLException e) {
			System.out.println(e);
		}
		return false;
	}
	
	public BookDto find(int bno) {
		try {
			String sql = "select * from book where bno=?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, bno);
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()) {
				BookDto bookDto = new BookDto();
				
				bookDto.setBno(rs.getInt("bno"));
				bookDto.setBname(rs.getString("bname"));
				bookDto.setBwriter(rs.getString("bwriter"));
				bookDto.setBcompany(rs.getString("bcompany"));
				bookDto.setIndate(rs.getString("indate"));
				bookDto.setPutdate(rs.getString("putdate"));
				
				return bookDto;
			}
			
		}catch (SQLException e) {
			System.out.println(e);
		}
		
		return null;
	}
}

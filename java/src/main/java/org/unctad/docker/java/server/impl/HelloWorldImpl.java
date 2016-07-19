package org.unctad.docker.java.server.impl;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.unctad.docker.java.model.Book;
import org.unctad.docker.java.server.DefaultApi;

public class HelloWorldImpl implements DefaultApi {
	
	private Book book;
	
	private Book getBook() {
		if (book == null) {
			book = new Book();
			book.setId("123");
			book.setAuthor("John McClain");
			book.setTitle("Die Hard");
		}
		return book;
	}

	@Override
	public Response helloUserGet(String user) {
		String message = "Hi " + user + "! My name is Java Docker.";
		Response response = Response.status(Status.OK).entity(message).build();
		return response;
	}

	@Override
	public Response bookGet() {
		Response response = Response.status(Status.OK).entity(getBook()).build();
		return response;
	}

	@Override
	public Response saveBook(Book book) {
		this.book = book;
		Response response = Response.status(Status.OK).entity(getBook()).build();
		return response;
	}

}

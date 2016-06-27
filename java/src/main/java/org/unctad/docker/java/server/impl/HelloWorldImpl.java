package org.unctad.docker.java.server.impl;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.unctad.docker.java.server.DefaultApi;

public class HelloWorldImpl implements DefaultApi {

	@Override
	public Response helloUserGet(String user) {
		String message = "Hi " + user + "! My name is Java Docker.";
		Response response = Response.status(Status.OK).entity(message).build();
		return response;
	}

}

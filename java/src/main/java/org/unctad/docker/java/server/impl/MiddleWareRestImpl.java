package org.unctad.docker.java.server.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import org.unctad.docker.java.model.Count;
import org.unctad.docker.java.model.ProcessDefinition;
import org.unctad.docker.java.model.ProcessTask;
import org.unctad.docker.java.server.DefaultApi;
import org.unctad.docker.java.server.utils.Utils;

import java.util.logging.Level;

import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.apache.cxf.jaxrs.client.WebClient;

public class MiddleWareRestImpl implements DefaultApi {
	
	
	private static final Logger LOGGER = Logger.getLogger(MiddleWareRestImpl.class.getName());

	@Override
	public Response getsTaskSubmission(String taskId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Response saveTaskSubmission(String taskId, String formData) {
		LOGGER.log(Level.INFO, "Submission data received!");
		LOGGER.log(Level.INFO, formData);
		
		String uri = "http://haproxy:6001/formio/survey/submission?dryrun=1";
		List<Object> providers = new ArrayList<Object>();
		providers.add(new JacksonJsonProvider());
		WebClient client = WebClient.create(uri, providers).type(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON);
		String validation = client.post(formData).readEntity(String.class);
		LOGGER.log(Level.INFO, "formio validation: " + validation);
		boolean isValid = Boolean.parseBoolean(validation);
		if (isValid && completeTask(taskId, formData)) {
			Response response = Response.status(Status.OK).entity(true).build();
			return response;
		} else {
			Response response = Response.status(Status.OK).entity(false).build();
			return response;
		}
	}
	
	private boolean completeTask(String taskId, String formData) {
		String uri = "http://camunda:8080/engine-rest/engine/default/task/" + taskId + "/complete";
		List<Object> providers = new ArrayList<Object>();
		providers.add(new JacksonJsonProvider());
		WebClient client = WebClient.create(uri, providers).accept(MediaType.APPLICATION_JSON).type(MediaType.APPLICATION_JSON);
		String body = Utils.convertToCamundaJson(formData);
		if (body == null) {
			return false;
		}
		Response response = client.post(body);
		if (response.getStatus() == 204) {
			LOGGER.log(Level.WARNING, "Task sumbitted, taskId: " + taskId);
			return true;
		}
		LOGGER.log(Level.WARNING, "Task not sumbitted, taskId: " + taskId);
		return false;
	}

	@Override
	public Response getTaskForm(String taskId) {
		try {
			String taskKey = getCamundaTaskKey(taskId);
			if (taskKey != null) {
				String uri = "http://haproxy:6001/formio/" + taskKey;
				List<Object> providers = new ArrayList<Object>();
				providers.add( new JacksonJsonProvider() );
				WebClient client = WebClient.create(uri, providers).accept(MediaType.APPLICATION_JSON).type(MediaType.APPLICATION_JSON);
				String formIoResponse = client.get().readEntity(String.class);	
				String formVariables = getCamundaTaskFormVariables(taskId);
				JSONObject obj = new JSONObject(formIoResponse);
				JSONObject variables = new JSONObject();
				variables.put("data", new JSONObject(Utils.convertFromCamundaToJson(formVariables)));
				obj.accumulate("variables", variables);
				Response response = Response.status(Status.OK).entity(obj.toString()).build();
				return response;
			} else {
				LOGGER.log(Level.WARNING, "Task form not found, taskId: " + taskId);
				Response response = Response.status(Status.NOT_FOUND).entity("Task form not found!").build();
				return response;
			}
		} catch (JSONException ex) {
			LOGGER.log(Level.SEVERE, ex.toString());
			Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity("Internal server error!").build();
			return response;
		}
	}
	
	private String getCamundaTaskKey(String taskId) throws JSONException {
		String uri = "http://camunda:8080/engine-rest/engine/default/task/" + taskId + "/form";
		List<Object> providers = new ArrayList<Object>();
		providers.add( new JacksonJsonProvider() );
		WebClient client = WebClient.create(uri, providers).accept(MediaType.APPLICATION_JSON).type(MediaType.APPLICATION_JSON);
		String json = client.get().readEntity(String.class);
		JSONObject resultObject = new JSONObject(json);
		return resultObject.getString("key");
	}
	
	private String getCamundaTaskFormVariables(String taskId) throws JSONException {
		String uri = "http://camunda:8080/engine-rest/engine/default/task/" + taskId + "/form-variables";
		List<Object> providers = new ArrayList<Object>();
		providers.add( new JacksonJsonProvider() );
		WebClient client = WebClient.create(uri, providers).accept(MediaType.APPLICATION_JSON).type(MediaType.APPLICATION_JSON);
		String json = client.get().readEntity(String.class);
		return json;
	}

	@Override
	public Response getProcessDefinitionList() {
		String uri = "http://camunda:8080/engine-rest/engine/default/process-definition/";
		List<Object> providers = new ArrayList<Object>();
		providers.add( new JacksonJsonProvider() );
		WebClient client = WebClient.create(uri, providers).accept(MediaType.APPLICATION_JSON).type(MediaType.APPLICATION_JSON);
		List<ProcessDefinition> processDefinitions = client.get().readEntity(List.class);
		Response response = Response.status(Status.OK).entity(processDefinitions).build();
		return response;
	}

	@Override
	public Response getProcessDefinitionCount() {
		String uri = "http://camunda:8080/engine-rest/engine/default/process-definition/count";
		List<Object> providers = new ArrayList<Object>();
		providers.add( new JacksonJsonProvider() );
		WebClient client = WebClient.create(uri, providers).accept(MediaType.APPLICATION_JSON).type(MediaType.APPLICATION_JSON);
		Count count = client.get().readEntity(Count.class);
		Response response = Response.status(Status.OK).entity(count).build();
		return response;
	}

	@Override
	public Response getTaskList() {
		String uri = "http://camunda:8080/engine-rest/engine/default/task/";
		List<Object> providers = new ArrayList<Object>();
		providers.add( new JacksonJsonProvider() );
		WebClient client = WebClient.create(uri, providers).accept(MediaType.APPLICATION_JSON).type(MediaType.APPLICATION_JSON);
		List<ProcessTask> processDefinitions = client.get().readEntity(List.class);
		Response response = Response.status(Status.OK).entity(processDefinitions).build();
		return response;
	}

	@Override
	public Response startProcess(String processDefinitionId) {
		try {
			String uri = "http://camunda:8080/engine-rest/engine/default/process-definition/" + processDefinitionId + "/start";
			List<Object> providers = new ArrayList<Object>();
			providers.add(new JacksonJsonProvider());
			WebClient client = WebClient.create(uri, providers).accept(MediaType.APPLICATION_JSON).type(MediaType.APPLICATION_JSON);
			String process = client.post("{}").readEntity(String.class);
			JSONObject resultObject = new JSONObject(process);
			String processId = resultObject.getString("id");
			String taskId = getProcessTaskId(processId);
			System.out.println("taskID: " + taskId);
			JSONObject task = new JSONObject();
			task.put("id", taskId);
			Response response = Response.status(Status.OK).entity(task.toString()).build();
			return response;
		} catch (JSONException ex) {
			LOGGER.log(Level.SEVERE, ex.getMessage());
			Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity("Internal server error!").build();
			return response;
		}
	}
	
	private String getProcessTaskId(String processId) throws JSONException {
		String uri = "http://camunda:8080/engine-rest/engine/default/task?processInstanceId=" + processId;
		List<Object> providers = new ArrayList<Object>();
		providers.add( new JacksonJsonProvider() );
		WebClient client = WebClient.create(uri, providers).accept(MediaType.APPLICATION_JSON).type(MediaType.APPLICATION_JSON);
		String taskListJson = client.get().readEntity(String.class);
		System.out.println("KALA: " + taskListJson);
		if (taskListJson != null) {
			JSONArray jsonarray = new JSONArray(taskListJson);
			JSONObject jsonObject = jsonarray.getJSONObject(0);
			return jsonObject.getString("id");
		}
		return null;
	}

}

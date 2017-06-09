package com.jaxlayer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.jaxlayer.webreflector.resti.utils.Utils;

@SpringBootApplication
public class Application 
{
	public static void main(String[] args) throws Exception 
	{
		SpringApplication.run(Application.class, args);
		String url=Utils.protocol+Utils.server+":"+Utils.port;
		System.out.println("Link to use applicartion: "+url);
	}
}

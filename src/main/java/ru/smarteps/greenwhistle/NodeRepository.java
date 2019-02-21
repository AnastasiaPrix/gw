package ru.smarteps.greenwhistle;

import java.time.Duration;
import java.util.Random;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Repository;

import reactor.core.publisher.Flux;
import ru.smarteps.greenwhistle.model.Node;

@Repository
public class NodeRepository{
	
	Flux<Node> stream = null;
	ScheduledExecutorService es = null;
	private Random r;
	
	public NodeRepository() {
		es = Executors.newSingleThreadScheduledExecutor();
		r = new Random();
		stream = Flux.interval(Duration.ofSeconds(3)).map(seq -> new Node());
	}
	
	public Flux<Node> getStream(){
		return stream;
	}
}

package ru.smarteps.greenwhistle;

import java.time.Duration;
import java.util.LinkedList;
import java.util.List;
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
	List<Node> nodes = new LinkedList<Node>();

	public NodeRepository() {
		es = Executors.newSingleThreadScheduledExecutor();
		r = new Random();
	}

	public Flux<Node> getNodesUpdates(){
		if (stream == null) {
			stream = Flux.<Node>create( (cons) -> {
				//				final FluxSink<Node> c = cons;
				es.scheduleAtFixedRate(new Runnable() {
					@Override
					public void run() {
						if (nodes.size()<10) {
							Node n = new Node("id"+r.nextInt(10000));
							n.setTimeStamp(System.currentTimeMillis());
							nodes.add(n);
							cons.next(n);
							System.out.println("new node" + n);
						}
						else {
							int rr = r.nextInt(3);
							switch (rr) {
							case 1:
								int toDel = r.nextInt(10);
								Node del = nodes.get(toDel);
								nodes.remove(del);
								del.setState("deleted");
								cons.next(del);
								break;
							case 2:
								int toMod = r.nextInt(nodes.size());
								Node mod = nodes.get(toMod);
								mod.setTimeStamp(System.currentTimeMillis());
								mod.setCpuUsed(r.nextDouble()*mod.getCpuCapacity());
							default:
								break;
							}
						}
					}
				}, 1, 3, TimeUnit.SECONDS);
			});
		}
		return stream;
	}

	public Flux<Node> getNodes() {
		return Flux.fromIterable(nodes);
	}
}


package ru.smarteps.greenwhistle;

import java.util.function.Consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import net.minidev.json.reader.JsonWriter;
import reactor.core.publisher.Flux;
import ru.smarteps.greenwhistle.model.Node;

@RestController
@AllArgsConstructor
public class NodeController{

	@Autowired
	private NodeRepository nodeRepository;
	
	@GetMapping(path = "/node_stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<String> getAllNodes(){
		nodeRepository.getStream().subscribe(new Consumer<Node>() {

			@Override
			public void accept(Node t) {
				System.out.println(t);
				
			}
		});
		return nodeRepository.getStream().map(item ->item.toString() );
	}
}

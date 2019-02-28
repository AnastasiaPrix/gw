import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { PpuNode } from './model/ppu_node';
import {map, filter, tap} from 'rxjs/operators';
import {EventSourcePolyfill} from 'ng-event-source';
import {ForceDirectedGraph, Link, Node} from './d3/models';
import {randomBates} from 'd3-random';
import {NodeLinks} from './model/NodeLinks';
import {GraphComponent} from './visuals/graph/graph.component';

@Injectable ({
    providedIn: 'root'
})
export class NodeService {
   data: PpuNode[] = [];
   data2: Node[] = [];
  data_obs: Observable<PpuNode[]>;
  data_nodes: Observable<Node[]>;
  data_links: Observable<Link[]>;
  eventSource: EventSourcePolyfill;


  constructor(private http: HttpClient) {
   const that = this;
   // let i = 2;
    this.data_nodes = Observable.create(observer => {
      const eventSource = new EventSourcePolyfill('/node_stream', { heartbeatTimeout: 5000, connectionTimeout: 5000});
      eventSource.onmessage = event => {
       const m = Math.floor(Math.random() *  15  + 1);
       console.log(m, '!');
        for (let j = 1; j <= m; j++) {
          const n = new Node(j);
          that.data2.push(n);
        }
       // console.log(n);
       //  const n1 = new Node(i);
       //  n.linkCount++;
       //  n1.linkCount++;
        // that.data2.push(n1);
       // console.log(that.data2);
       // i = i + 2;
        observer.next(that.data2);
      };
    });
  }
   getNodes(): Observable < Node[] > {
    return this.data_nodes;
  }
}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { PpuNode } from './model/ppu_node';
import {map, filter, tap} from 'rxjs/operators';
import {EventSourcePolyfill} from 'ng-event-source';
import {Link, Node} from './d3/models';
import {randomBates} from 'd3-random';
import {NodeLinks} from './model/NodeLinks';

@Injectable ({
    providedIn: 'root'
})
export class NodeService {
   data: PpuNode[] = [];
   data2: Node[] = [];
   data3: Link[] = [];
  // data1: NodeLinks;
  // data_1: Observable<NodeLinks[]>;
   // Node: string;
   // data: Node[];
 // data: string;
  data_obs: Observable<PpuNode[]>;
  data_nodes: Observable<Node[]>;
  data_links: Observable<Link[]>;
  eventSource: EventSourcePolyfill;


  constructor(private http: HttpClient) {
    // const eventList = document.querySelector('li');

   /* this.data_obs = this.http.get('/node_stream', {observe: 'events', responseType: 'text'})
     .pipe(map(e => [new PpuNode()]));*/
   const that = this;
   this.data_obs = Observable.create(observer => {
     const eventSource = new EventSourcePolyfill('/node_stream', { heartbeatTimeout: 5000, connectionTimeout: 5000});
     eventSource.onmessage = event => {
       const n = new PpuNode();
       n.id = event.data;
       that.data.push(n);
       observer.next(that.data);
     };
   });
   /* let j = 1;
    this.data_1 = Observable.create(observer => {
      const eventSource = new EventSourcePolyfill('/node_stream', { heartbeatTimeout: 5000, connectionTimeout: 5000});
      eventSource.onmessage = event => {
        that.data2.push(new Node(j));
       // const n = new Node(j);
        if (that.data2.length >= 2) {
          that.data2[j - 2].linkCount++;
          that.data2[j - 1].linkCount++;
          that.data3.push(new Link(j - 2 , j - 1)); }
        that.data1 = {that.data3; that.data2} ;
        observer.next(that.data);
      };
    }); */
    let i = 2;
    this.data_nodes = Observable.create(observer => {
      const eventSource = new EventSourcePolyfill('/node_stream', { heartbeatTimeout: 5000, connectionTimeout: 5000});
      eventSource.onmessage = event => {
        const n = new Node(i - 1);
        // n.id = event.data;
        const n1 = new Node(i);
        n.linkCount++;
        // n1.x = Math.random() * 800;
        // n1.y = Math.random() * 800;
       // n.x = Math.random() * 600;
      //  n.y = Math.random() * 600;

        n1.linkCount++;
        that.data2.push(n);
        that.data2.push(n1);
        i = i + 2;
        observer.next(that.data2);
      };
    });
    let j = 2;
    this.data_links = Observable.create(observer => {
      const eventSource = new EventSourcePolyfill('/node_stream', { heartbeatTimeout: 5000, connectionTimeout: 5000});
      eventSource.onmessage = event => {
        // this.data_nodes[j - 2].linkCount++;
       // this.data_nodes[j - 1].linkCount++;
         const n = new Link(that.data2[j - 1], that.data2[j]);
        that.data3.push(n);
        j++;
        observer.next(that.data3);
      };
    });
  }
  getNodeStream(): Observable < PpuNode[]> {
    /* console.log(this.data_obs); */
   /* return this.http.get('/node_stream', {observe: 'events', responseType: 'text'});
      .pipe(map(e => [new PpuNode()])); */
    return this.data_obs;
  }
   getNodes(): Observable < Node[] > {
    return this.data_nodes;
  }
  getLinks(): Observable < Link[] > {
    return this.data_links;
  }

}

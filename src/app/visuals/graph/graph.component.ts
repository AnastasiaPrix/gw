import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Injectable, Input, OnInit} from '@angular/core';
import {ForceDirectedGraph, Link, Node} from '../../d3';
import {Observable, pipe} from 'rxjs';
import * as d3 from 'd3';
import * as _ from 'underscore';

import {HttpClient} from '@angular/common/http';
import {EventSourcePolyfill} from 'ng-event-source';
import {map, subscribeOn, filter} from 'rxjs/operators';

@Component({
  selector: 'app-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <svg:g>
      <svg:g [linkVisual]="link" *ngFor="let link of links_r | async  "></svg:g>
        <svg:g [nodeVisual]="node" *ngFor="let node of nodes_r | async  "
               [draggableNode] = "node" [draggableInGraph] = "graph"></svg:g>
      </svg:g>
    </svg>
    <p *ngFor="let n of links_r | async">Link {{n.source.id}} - {{n.target.id}} </p>
    <p *ngFor="let n of nodes_r | async">Node {{n.index}} - {{n.id}} x: {{n.x}}</p>
     `,
  styleUrls: ['./graph.component.css']
})

@Injectable()
export class GraphComponent implements OnInit, AfterViewInit {
  @Input() nodes: Observable<Node[]>;
  // @Input() links;

  graph: ForceDirectedGraph;
  _options: { width, height } = { width: 800, height: 600 };
  nodes_r: Observable<Node[]>;
  links: Link[] = [];
  links_r: Observable<Link[]>;
  nodes2: Node[] = [];
  data_nodes: Node[] = [];
  data_r: Node[] = [];
  flag: boolean;
  max_id = -1;
  /* @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  } */

constructor(private ref: ChangeDetectorRef, private http: HttpClient) {
  console.log('in constructor graph!');
  }

  ngOnInit() {
   console.log('in constructor graph!');
   this.graph = this.getForceDirectedGraph([], [], this._options);

    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
      // this.ref.detectChanges();
         });

  }

  ngAfterViewInit() {
    // const lls = [];
    this.nodes_r = this.nodes.pipe(map(n =>
      _.map(n, nn => {
          nn.index = nn.id;
          nn.x = nn.x ? nn.x : 200;
          nn.y = nn.y ? nn.y : 200;
          // this.data_r = n;
          return nn;
        })
    ));
    this.links_r = this.nodes_r.pipe(
      map
    )
    console.log('!!!', this.data_r, '!!!');
     // this.links_r = Observable.create(subscriber =>
     //   lls.forEach(val => {
     //     console.log('!!!!!!!!!!!!!!1');
     //     console.log(val);
     //     console.log('!!!!!!!!!!!!!!1');
     //     subscriber.next(val); }
     //   )
     // );
    this.links_r = Observable.create(subscriber => {
      // this.data_r.forEach(nodes => {
      // this.nodes_r.forEach(( n, index, all ) => {
      const lls = [];
      this.data_r.forEach( (n, index, all) => {
          // const n1 = _.findIndex( this.data_r, item => (item.id === (n.id - 1) || item.id === (n.id + 1)) );
          // if (n1 !== -1) {
            // const ln = new Link( this.data_r[n1], n );
            const ln = new Link(n, all[index === all.length - 1 ? index - 1 : index + 1]);
            console.log(ln.source.id, '//', ln.target.id);
            lls.push( ln );
         // }
          // const ln = new Link(n, all[index === all.length - 1 ? index - 1 : index + 1]);
          // n.linkCount++;
          // nodes[index].linkCount++;

          // });
          subscriber.next( lls );
        }
      );
    });
       this.nodes_r.subscribe(xx => { this.graph.initNodes2(xx); console.log('initnodes'); } );
       this.links_r.subscribe(xx => { this.graph.initLinks2(xx); console.log('initlinks'); });
     // this.graph.initSimulation(this._options);
  }
  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
  getForceDirectedGraph(nodes: Node[], links: Link[], options: { width, height }) {
    if (!nodes) { nodes = []; }
    if (!links) { links = []; }
    if (!options) { options = {width: '640', height: '640' }; }
    const sg = new ForceDirectedGraph( nodes, links, options );
    return sg;
  }

  applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3.select(element);

    function started() {
      /** Preventing propagation of dragstart to parent elements */
      d3.event.sourceEvent.stopPropagation();

      if (!d3.event.active) {
        graph.simulation.alphaTarget(0.3).restart();
      }

      d3.event.on('drag', dragged).on('end', ended);

      function dragged() {
        node.fx = d3.event.x;
        node.fy = d3.event.y;
      }

      function ended() {
        if (!d3.event.active) {
          graph.simulation.alphaTarget(0);
        }

        node.fx = null;
        node.fy = null;
      }
    }

    d3element.call(d3.drag()
      .on('start', started));
  }
}

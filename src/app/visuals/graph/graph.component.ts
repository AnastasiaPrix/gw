import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Injectable, Input, OnInit} from '@angular/core';
import {ForceDirectedGraph, Link, Node} from '../../d3';
import {Observable} from 'rxjs';
import * as d3 from 'd3';
import {HttpClient} from '@angular/common/http';
import {EventSourcePolyfill} from 'ng-event-source';

@Component({
  selector: 'app-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <svg:g>
      <svg:g [linkVisual]="link" *ngFor="let link of links  "></svg:g>
        <svg:g [nodeVisual]="node" *ngFor="let node of nodes_r  "
               [draggableNode] = "node" [draggableInGraph] = "graph"></svg:g>
      </svg:g>
    </svg>
  `,
  styleUrls: ['./graph.component.css']
})

@Injectable()
export class GraphComponent implements OnInit, AfterViewInit {
  @Input() nodes: Observable<Node[]>;
  // @Input() links;

  graph: ForceDirectedGraph;
  _options: { width, height } = { width: 800, height: 600 };
  nodes_r: Node[] = [];
  links: Link[] = [];
  nodes2: Node[] = [];
  data_nodes: Node[] = [];
  data_links: Link[] = [];
  flag: boolean;
  /* @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  } */

constructor(private ref: ChangeDetectorRef, private http: HttpClient) {
  console.log('in constructor graph!');
  }

  ngOnInit() {
   console.log('in constructor graph!');
   this.graph = this.getForceDirectedGraph(this.nodes_r, this.links, this._options);

    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
      // this.ref.detectChanges();
         });

  }

  ngAfterViewInit() {
   // this.data_nodes.subscribe();
    this.graph.initSimulation(this._options);
    // let i = 1;
    this.flag = false;
    this.nodes.subscribe( x => {
      // console.log(x.length!!);
      if ( this.flag) {
        this.nodes_r.length = 0;
        this.links.length = 0;
        this.flag = false;
        this.nodes2.length = 0;

        // this.graph.initNodes();
      }
      this.nodes2 = x as Node[];
      console.log(this.nodes2.length, '!!');
      for (let i = 1; i <= this.nodes2.length; i++) {
        this.nodes_r.push(new Node(i));
       // console.log(this.nodes_r.length, '!');
        // console.log('---------------------------1-----------------------');
        if (this.nodes_r.length >= 2) {
          this.nodes_r[i - 2].linkCount++;
          this.nodes_r[i - 1].linkCount++;
          this.links.push(new Link(i - 2 , i - 1)); }
        this.graph.initNodes();
      // i++;
        this.flag = true;
       }


      // this.nodes_r = [];
      // this.links = [];
      // console.log(this.nodes2);
      // console.log('---------------------------------------------------');
       // console.log(this.nodes2);
      // console.log('---------------------------2----------------------');
      });
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

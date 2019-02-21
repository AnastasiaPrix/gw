import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { NodeService } from '../node.service';
import { Observable } from 'rxjs';
import { PpuNode } from '../model/ppu_node';
import {EventSourcePolyfill} from 'ng-event-source';
import {Link, Node} from '../d3/models';
import * as d3 from 'd3';
import * as shape from 'd3-shape';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import {randomBates} from 'd3';

// import {Link} from 'd3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
// export class DashboardComponent implements OnChanges {
 // @ViewChild('graph')


  node: Observable<PpuNode[]>;
  nodes: Observable<Node[]>;
  // links: Link[] = [];
  // nodes: Node[] = [];
 // links2: Link[] = [];
 // nodes2: Node[] = [];
  // hierarchialGraph = {nodes: [], links: []};
 // curve = shape.curveBundle.beta(1);
  links: Observable<Link[]>;

 // @Input()
  // nodes: PpuNode[];
 // nodes: Observable<PpuNode[]>
  // margin = {top: 20, right: 20, bottom: 30, left: 40};
  constructor(private breakpointObserver: BreakpointObserver, private nodeService: NodeService) {
    // constructor() {
    this.node = nodeService.getNodeStream() ;
    this.nodes = nodeService.getNodes();
    this.links = nodeService.getLinks();
    /* nodeService.getNodes().subscribe(data => {
      // this.nodes = data.json();
      this.nodes.push(data);
      console.log(this.nodes);

    });
    nodeService.getLinks().subscribe(d => {
      this.links.push(d);
      console.log(this.links);
    }); */
   // this.nodes = nodeService.getNodes();
   // this.links = nodeService.getLinks();
   /* const m = 2;
for (let j = 1; j < m; j++) {
        this.nodes.push(new Node(j));
       if (this.nodes.length >= 2) {
         this.nodes[j - 2].linkCount++;
         this.nodes[j - 1].linkCount++;
         this.links.push(new Link(j - 2 , j - 1)); }
     } */

   /* this.node.subscribe( value => {
       const i = this.nodes2.length + 1;
       // const n = new Node( i );
        // n.x = 100 + 40 * i;
        //  n.y = 100;
        //  n.id = i.toString();
        this.nodes2.push( new Node( i ) );
        console.log( 'new node! ', this.nodes2.length );
        console.log( this.nodes );
        if (this.nodes2.length >= 2) {
          this.nodes2[i - 2].linkCount++;
          this.nodes2[i - 1].linkCount++;
          this.links2.push( new Link( i , i - 1 ) );
        }
        if (this.nodes2.length >= 10){
          this.nodes = this.nodes2;
          this.links = this.links2;
        }
        console.log( this.links );
    } ); */

    /*this.node.forEach(value => {
      const n = new Node(i);
      this.nodes.push(n);
      console.log('new node! ', this.nodes.length );
       if (this.nodes.length >= 2) {
        this.nodes[i - 2].linkCount++;
        this.nodes[i - 1].linkCount++;
        this.links.push(new Link(i - 2 , i - 1)); }
      i++;
    });/*
    /*
      this.nodes.push(new Node(i));
    } */
     // for (let j = 1; j <= this.nodes.length; j++) {
     /// for (let m = 2; j * m <= this.nodes.length; m++) {
        /** increasing connections toll on connecting nodes
        this.nodes[getIndex(j)].linkCount++;
        this.nodes[getIndex(j * m)].linkCount++;
        /** connecting the nodes before starting the simulation
        this.links.push(new Link(j, j * m));
      }
    }
   */

  }

  ngOnInit(): void {
    console.log('in Init');

    /* this.nodeService.getNodes().subscribe(data => {
     this.nodes = data;
     console.log(this.nodes);

   });
    this.nodeService.getLinks().subscribe(d => {
      this.links = d;
      console.log(this.links);
    }); */
    // this.showGraph();
   /* this.node.subscribe( value => {
      const i = this.nodes.length + 1;
      const n = new Node(i);
      // n.x = 100 + 40 * i;
      //  n.y = 100;
      //  n.id = i.toString();
      this.nodes.push(n);
      console.log('new node! ', this.nodes.length );
      console.log(this.nodes);
      if (this.nodes.length >= 2) {
        this.nodes[i - 2].linkCount++;
        this.nodes[i - 1].linkCount++;
        this.links.push(new Link(i - 2 , i - 1)); }
      console.log(this.links);
    }); */
  }


  showGraph() {

    console.log('START');
    // this. hierarchialGraph.nodes = this.nodes;
   // this. hierarchialGraph.links = this.links;

    /* this.hierarchialGraph.nodes = [
      {
        id: 'start',
        label: 'scan',
        // position: 'x0'
        x: 10,
        y: 10
      }, {
        id: '1',
        label: 'Event#a',
        // position: 'x1'
        x: 70,
        y: 60
      }, {
        id: '2',
        label: 'Event#x',
        // position: 'x2'
        x: 100,
        y: 40
      }, {
        id: '3',
        label: 'Event#b',
        // position: 'x3'
        x: 130,
        y: 50
      }, {
        id: '4',
        label: 'Event#c',
        // position: 'x4'
        x: 90,
        y: 10
      }, {
        id: '5',
        label: 'Event#y',
        // position: 'x5'
        x: 100,
        y: 20
      }, {
        id: '6',
        label: 'Event#z',
       // position: 'x6'
        x: 10,
        y: 40
      }
    ];

    this.hierarchialGraph.links = [
      {
        source: 'start',
        target: '1',
        label: 'Process#1'
      }, {
        source: 'start',
        target: '2',
        label: 'Process#2'
      }, {
        source: '1',
        target: '3',
        label: 'Process#3'
      }, {
        source: '2',
        target: '4',
        label: 'Process#4'
      }, {
        source: '2',
        target: '6',
        label: 'Process#6'
      }, {
        source: '3',
        target: '5'
      }
    ]; */

  }
  /*
  onResize() {
    this.createGraph();
  }
  ngOnChanges(): void {

    if (!this.nodes) {
      console.log('new node!!!');
      return; }

    this.createGraph();
  }
  private createGraph(): void {
    d3.select('svg').remove();

   // const element = this.chartContainer.nativeElement;
  //  const data = this.nodes;

    const svg = d3.select('svg')
      .attr('width', 800)
      .attr('height', 600);

   // const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
   // const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;
    const leaf = svg.selectAll('g')
      .data(this.nodes)
      .enter().append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    leaf.append('circle')
      .attr('id', d => (d.id))
      .attr('r', '20px')
      .attr ('cx', d3.randomBates(700))
      .attr ('cy',  d3.randomBates(500))
      .attr('fill', 'red');

  } */
}

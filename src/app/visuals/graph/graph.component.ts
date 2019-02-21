import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Injectable, Input, OnInit} from '@angular/core';
import {ForceDirectedGraph, Link, Node} from '../../d3';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <svg:g>
      <svg:g [linkVisual]="link" *ngFor="let link of links  "></svg:g>
        <svg:g [nodeVisual]="node" *ngFor="let node of nodes_r "></svg:g>
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

  /* @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  } */

constructor(private ref: ChangeDetectorRef) {
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
    this.graph.initSimulation(this._options);
    let j = 1;
    this.nodes.subscribe( x => {
      this.nodes_r.push(new Node(j));
      if (this.nodes_r.length >= 2) {
        this.nodes_r[j - 2].linkCount++;
        this.nodes_r[j - 1].linkCount++;
        this.links.push(new Link(j - 2 , j - 1)); }
      this.graph.initNodes();
      j++;
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
}

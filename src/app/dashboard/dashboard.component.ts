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
  nodes: Observable<Node[]>;
  constructor(private breakpointObserver: BreakpointObserver, private nodeService: NodeService) {
    this.nodes = nodeService.getNodes();

  }

  ngOnInit(): void {
    console.log('in Init');
  }
}

import {Component, OnInit} from '@angular/core';
import {NodeService} from './node.service';
import {Observable} from 'rxjs';
import {PpuNode} from './model/ppu_node';
import {Node} from './d3/models';


type CallbackFcn = (data: any) => void;
/*
declare class EventSource {
  constructor(name: string);

  onopen: CallbackFcn;

  onmessage: CallbackFcn;

  onerror: CallbackFcn;

  addEventListener(evt: string, cb: CallbackFcn): void;
}
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NodeService]
})
export class AppComponent implements OnInit {
  title = 'client';
  // reference to an EventSource to process SSE
  protected _eventSource: EventSource;
  // have we subscribed to an event stream yet?
  protected _subscribed = false;
  nodes: Observable<Node[]>;
  /*public toggle_sidenav(): void {
    this.sidenav_state = !this.sidenav_state;
  }*/
  constructor(private _nodeService: NodeService) {
   /* this._eventSource           = new EventSource('/node_stream');
    this._eventSource.onmessage = (data) => this.__onMessage(data);
    console.log("ev started");*/
    this.nodes = _nodeService.getNodes();
  }

  ngOnInit(): void {

  }


}


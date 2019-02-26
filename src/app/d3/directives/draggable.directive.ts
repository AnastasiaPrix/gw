import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Node, ForceDirectedGraph } from '../models';
import { D3Service } from '../d3.service';
import { GraphComponent} from '../../visuals/graph/graph.component';

@Directive({
  selector: '[draggableNode]'
})
export class DraggableDirective implements OnInit {
  @Input('draggableNode') draggableNode: Node;
  @Input('draggableInGraph') draggableInGraph: ForceDirectedGraph;

  constructor( private _element: ElementRef, private graph: GraphComponent) { }

  ngOnInit() {
    this.graph.applyDraggableBehaviour(this._element.nativeElement, this.draggableNode, this.draggableInGraph);
  }
}

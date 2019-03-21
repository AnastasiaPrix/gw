import { Component, Input } from '@angular/core';
import {Node} from '../../d3/models';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:circle
          cx="0"
          cy="0"
          r="10"
          fill="steelblue"
          stroke="black">
      </svg:circle>
      <svg:g translate="transform(20,20)">
      <svg:text y="0"
      color="blue">
        id: {{node.id}}
      </svg:text>
        <svg:text y="10"
                  color="blue">
          x: {{node.x | number:'1.0-0'}}
        </svg:text>
        <svg:text y="20"
                  color="blue">
          y: {{node.y| number:'1.0-0'}}
        </svg:text>
      </svg:g>
    </svg:g>
  `
})
export class NodeVisualComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('nodeVisual') node: Node;
}

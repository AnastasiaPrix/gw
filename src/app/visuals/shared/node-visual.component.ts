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
      <svg:text
      color="blue">
        {{node.id}}
      </svg:text>
    </svg:g>
  `
})
export class NodeVisualComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('nodeVisual') node: Node;
}

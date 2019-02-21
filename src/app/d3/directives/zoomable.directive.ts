import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { D3Service } from '../d3.service';

@Directive({
  selector: '[zoomableOf]'
})
export class ZoomableDirective implements OnInit {
  @Input('zoomableOf') zoomableOf: ElementRef;

  constructor(private d3Service: D3Service, private _element: ElementRef) {}

  ngOnInit() {
   
  }
}

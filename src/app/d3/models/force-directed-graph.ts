 import { EventEmitter } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import * as d3 from 'd3';
 import {Observable} from 'rxjs';

const FORCES = {
    LINKS: 1 / 10,
    COLLISION: 0.5,
    CHARGE: -0.5
};

export class ForceDirectedGraph {
    public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
    public simulation: d3.Simulation<any, any>;

     public nodes: Node[] = [];
     public links: Link[] = [];
   // public links: Observable<any>;
   // public nodes: Observable<any>;
    /* constructor(nodes: Observable<Node[]>, links: Observable<Link[]>, options: { width, height }) {
     // const that = this;
      nodes.subscribe( value => {that.nodes.concat( value[value.length - 1] ); that.initNodes(); that.simulation.restart(); });
     // links.subscribe( l => {that.links.concat(l[l.length - 1]); that.initLinks(); });
     // links.subscribe({next (l){that.links = l;}});
        // this.nodes = nodes;
        // this.links = links;

        this.initSimulation(options);
    } */
  constructor(nodes, links, options: { width; height }) {
      this.nodes = nodes;
      this.links = links;

      this.initSimulation(options);
}

    initNodes() {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }

        this.simulation.nodes(this.nodes);
        this.simulation.alpha(1);
        this.simulation.restart();
    }

    initLinks() {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }

        // Initializing the links force simulation
        this.simulation.force('links',
            d3.forceLink(this.links)
                .strength(FORCES.LINKS)
        );
    }

    initSimulation(options) {
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }

        /** Creating the simulation */
        if (!this.simulation) {
            const ticker = this.ticker;

            // Creating the force simulation and defining the charges
            this.simulation = d3.forceSimulation()
            .force('charge',
                d3.forceManyBody()
                    .strength(FORCES.CHARGE)
            );

            // Connecting the d3 ticker to an angular event emitter
            this.simulation.on('tick', function () {
                ticker.emit(this);
            });

            this.initNodes();
            this.initLinks();
        }

        /** Updating the central force of the simulation */
        this.simulation.force('centers', d3.forceCenter(options.width / 2, options.height / 2));

        /** Restarting the simulation internal timer */
        this.simulation.restart();
    }
}

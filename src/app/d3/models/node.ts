// import * as d3 from "d3";

// Implementing SimulationNodeDatum interface into our custom Node class
export class Node implements d3.SimulationNodeDatum {
    // Optional - defining optional implementation properties - required for relevant typing assistance
    index?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    id: string;

    linkCount = 0;

    constructor(id) {
        this.id = id;
    }
}

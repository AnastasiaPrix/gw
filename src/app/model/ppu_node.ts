export class PpuNode  {
  id: String = 'noid';
  lanUsed?: Number = 0;
  cpuUsed?: Number = 0;
  lanCapacity?: Number = 100;
  cpuCapacity?: Number = 100;
  timeStamp: Number;
  state?: String;
  update(x: PpuNode): any {
    this.lanUsed = x.lanUsed;
    this.cpuUsed = x.cpuUsed;
    this.lanCapacity = x.lanCapacity;
    this.cpuCapacity = x.cpuCapacity;
    this.state = x.state;
    this.timeStamp = x.timeStamp;
  }
}


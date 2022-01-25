export class Metric {

  constructor(
    public id: number,
    public date: Date,
    public sessionId: string,
    public amount: number,
    public apr: number,
    public cost: number) {
  }
}

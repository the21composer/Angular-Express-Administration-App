export class Stock {
  public id: string;
  public name: string;
  public valueRule: string;
  public value: number;
  public max: number;
  public number: number;
  constructor(data: Stock) {
    this.id = data.id;
    this.name = data.name;
    this.valueRule = data.valueRule;
    this.value = data.value;
    this.max = data.max;
    this.number = data.number;
  }
}

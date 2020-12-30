export class Settings {
  public startTime: string;
  public endTime: string;
  public interval: string;
  constructor(data: Settings) {
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.interval = data.interval;
  }
}

export class Broker {
  public name: string;
  public surname: string;
  public id: string;
  public balance: string;
  public nickname: string;
  constructor(data: Broker) {
    this.name = data.name;
    this.surname = data.surname;
    this.id = data.id;
    this.balance = data.balance;
    this.nickname = data.nickname;
  }
}

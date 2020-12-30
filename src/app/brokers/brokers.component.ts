import {Component, OnInit} from '@angular/core';
import {BrokersService} from '../brokers.service';

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css'],
  providers: [BrokersService]
})
export class BrokersComponent implements OnInit {

  constructor(public brokersService: BrokersService) {}

  ngOnInit(): void {
    this.brokersService.addData(0);
  }
  onDelete(id: string): void {
    this.brokersService.deleteData(id);
  }
  onEdit(id: string): void {
    // tslint:disable-next-line:radix
    this.brokersService.editBalance(id, parseInt((document.getElementById('eb' + id) as HTMLInputElement).value));
  }
  onAdd(): void {
    const name = (document.getElementById('i-name') as HTMLInputElement).value;
    const nick = (document.getElementById('i-nick') as HTMLInputElement).value;
    const surname = (document.getElementById('i-surname') as HTMLInputElement).value;
    // tslint:disable-next-line:radix
    const balance = parseInt((document.getElementById('i-balance') as HTMLInputElement).value);
    this.brokersService.addBroker(name, surname, nick, balance);
  }
}

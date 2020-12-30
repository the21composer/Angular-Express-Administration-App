import { Component, OnInit } from '@angular/core';
import {StocksService} from '../stocks.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  constructor(public stocksService: StocksService) {}

  ngOnInit(): void {
    this.stocksService.addData(0);
  }
  onDelete(id: string): void {
    this.stocksService.deleteData(id);
  }
  onAdd(): void {
    const name = (document.getElementById('i-name') as HTMLInputElement).value;
    const valueRule = (document.getElementById('i-valueRule') as HTMLSelectElement).value;
    console.log(valueRule);
    // tslint:disable-next-line:radix
    const value = parseInt((document.getElementById('i-value') as HTMLInputElement).value);
    // tslint:disable-next-line:radix
    const max = parseInt((document.getElementById('i-max') as HTMLInputElement).value);
    // tslint:disable-next-line:radix
    const num = parseInt((document.getElementById('i-number') as HTMLInputElement).value);
    this.stocksService.addStock(name, valueRule, value, max, num);
  }
  onEdit(id: string): void {
    const name = (document.getElementById('e-name' + id) as HTMLInputElement).value;
    const valueRule = (document.getElementById('e-rule' + id) as HTMLInputElement).value;
    // tslint:disable-next-line:radix
    const value = parseInt((document.getElementById('e-value' + id) as HTMLInputElement).value);
    // tslint:disable-next-line:radix
    const max = parseInt((document.getElementById('e-max' + id) as HTMLInputElement).value);
    // tslint:disable-next-line:radix
    const num = parseInt((document.getElementById('e-num' + id) as HTMLInputElement).value);
    this.stocksService.editStock(id, name, valueRule, value, max, num);
  }
}



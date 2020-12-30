import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Stock} from './data/Stock';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  constructor(private http: HttpClient, private msg: MatSnackBar) {
  }

  private data: Stock[] = [];

  getData(): Stock[] {
    return this.data;
  }
  addData(type: number): void {
    this.http.get('http://localhost:3000/stocks')
      .subscribe((data: Stock[]) => {
        if (type === 0) {
          this.data = [];
          for (const item of data) {
            this.data.push(item);
          }
        } else if (type === 1) {
          for (const item of this.data) {
            let check = false;
            for (const newItem of data) {
              if (newItem.id === item.id) {
                check = true;
                break;
              }
            }
            if (!check) {
              this.data.splice(this.data.indexOf(item), 1);
            }
          }
        }
      }, (err) => {
        console.log('Error:', err);
      });
  }
  deleteData(id: string): void {
    const url = `http://localhost:3000/stocks/${id}`;
    this.http.delete(url)
      .subscribe(( ) => {
        this.addData(1);
      });
  }
  addStock(name: string, valueRule: string, value: number, max: number, num: number): void {
    if (name === '' || value <= 0 || num <= 0 || max < 0) {
      this.msg.open('Введенные данные некорректны!', 'Закрыть', {
        duration: 2000,
      });
      return;
    }
    this.http.post('http://localhost:3000/stocks/add', {
      name, valueRule, value, max, num
    })
      .subscribe((data: Stock) => {
        this.data.push(data);
      });
  }
  editStock(id: string, name: string, valueRule: string, value: number, max: number, num: number): void {
    if (name === '' || value <= 0 || num <= 0 || max < 0) {
      this.msg.open('Введенные данные некорректны!', 'Закрыть', {
        duration: 2000,
      });
      return;
    }
    this.http.post('http://localhost:3000/stocks/edit', {
      id, name, valueRule, value, max, num
    })
      .subscribe((data: Stock) => {
        console.log(data);
        for (const item of this.data) {
          if (item.id === data.id) {
            item.name = data.name;
            item.valueRule = data.valueRule;
            item.value = data.value;
            item.max = data.max;
            item.number = data.number;
          }
        }
      });
  }
}

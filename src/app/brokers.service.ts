import {Injectable} from '@angular/core';
import {Broker} from './data/Broker';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BrokersService {
  constructor(private http: HttpClient, private msg: MatSnackBar) {
  }

  private data: Broker[] = [];

  getData(): Broker[] {
    return this.data;
  }

  addData(type: number): void {
    this.http.get('http://localhost:3000/brokers')
      .subscribe((data: Broker[]) => {
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
        } else if (type === 2) {
          for (const item of this.data) {
            for (const newItem of data) {
              if (newItem.id === item.id && newItem.balance !== item.balance) {
                item.balance = newItem.balance;
                break;
              }
            }
          }
        }
      }, (err) => {
        console.log('Error:', err);
      });
  }
  deleteData(id: string): void {
    const url = `http://localhost:3000/brokers/${id}`;
    this.http.delete(url)
      .subscribe(() => {
        this.addData(1);
      });
  }
  editBalance(id: string, balance: number): void {
    if (balance < 0) {
      this.msg.open('Баланс должен быть положительным!', 'Закрыть', {
        duration: 2000,
      });
      return;
    }
    this.http.post('http://localhost:3000/brokers/edit', {id, balance})
      .subscribe(() => {
        this.addData(2);
      });
  }
  addBroker(name: string, surname: string, nick: string, balance: number): void {
    if (balance < 0) {
      this.msg.open('Баланс должен быть положительным!', 'Закрыть', {
        duration: 2000,
      });
      return;
    }
    if (name === '' || nick === '' || surname === '') {
      this.msg.open('Ник, имя и фамилия не должны быть пустыми!', 'Закрыть', {
        duration: 2000,
      });
      return;
    }
    for (const user of this.data) {
      if (user.nickname === nick) {
        this.msg.open('Пользователь с таким ником уже существует!', 'Закрыть', {
          duration: 2000,
        });
        return;
      }
    }
    this.http.post('http://localhost:3000/brokers/add', {
      name, surname, nick, balance
    })
      .subscribe((data: Broker) => {
        this.data.push(data);
      });
  }
}

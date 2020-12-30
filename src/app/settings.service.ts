import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Settings} from './data/Settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient, private msg: MatSnackBar) {}

  private data: Settings;
  getData(): Settings {
    return this.data;
  }
  addData(): void {
    this.http.get('http://localhost:3000/settings')
      .subscribe((data: Settings) => {
        this.data = new Settings(data);
      });
  }
  editData(startTime: string, endTime: string, interval: string): void {
    const startDate = new Date(Date.parse(startTime));
    const endDate = new Date(Date.parse(endTime));
    if (endDate < startDate) {
      this.msg.open('Начало аукциона должно быть раньше конца!', 'Закрыть', {
        duration: 2000,
      });
      return;
    }
    this.http.post('http://localhost:3000/settings/edit', {startTime, endTime, interval})
      .subscribe((data: Settings) => {
        this.data.startTime = data.startTime;
        this.data.endTime = data.endTime;
        this.data.interval = data.interval;
        this.msg.open('Настройки сохранены!', 'Закрыть', {
          duration: 2000,
        });
      });
  }

}

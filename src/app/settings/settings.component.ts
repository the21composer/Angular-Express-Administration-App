import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.addData();
  }
  onEdit(): void {
    const startTime = (document.getElementById('start') as HTMLInputElement).value;
    const endTime = (document.getElementById('end') as HTMLInputElement).value;
    const interval = (document.getElementById('int') as HTMLInputElement).value;
    this.settingsService.editData(startTime, endTime, interval);
  }

}

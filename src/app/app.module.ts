import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {RouterModule, Routes} from '@angular/router';
import {BrokersComponent} from './brokers/brokers.component';
import {StocksComponent} from './stocks/stocks.component';
import {SettingsComponent} from './settings/settings.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

const appRoutes: Routes = [
  {path: '', component: BrokersComponent},
  {path: 'stocks', component: StocksComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BrokersComponent,
    StocksComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes),
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatBadgeModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

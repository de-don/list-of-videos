import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoDetailsComponent } from './components/video-details/video-details.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

const matModules = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
];

@NgModule({
  declarations: [
    AppComponent,
    VideoDetailsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ...matModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}

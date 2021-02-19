import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { VideoDetailsComponent } from './components/video-details/video-details.component';

const matModules = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatSnackBarModule,
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

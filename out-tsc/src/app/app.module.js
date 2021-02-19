import { __decorate } from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideosListComponent } from './components/videos-list/videos-list.component';
import { VideoDetailsComponent } from './components/video-details/video-details.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
const matModules = [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            VideosListComponent,
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map
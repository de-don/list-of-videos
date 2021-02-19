import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { first, pluck, scan, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
/**
 * App Component
 *
 * Bootstrap component for whole application
 */
let AppComponent = class AppComponent {
    constructor(youtubeVideosService) {
        this.youtubeVideosService = youtubeVideosService;
        this.loadPage$ = new BehaviorSubject(null);
        this.videosPagedList$ = this.loadPage$.pipe(switchMap(pageId => this.youtubeVideosService.getTopList(pageId)));
        this.videos$ = this.videosPagedList$.pipe(scan((videos, pagedList) => {
            if (!pagedList.pagination.prevPageToken) {
                return pagedList.items;
            }
            return [...videos, ...pagedList.items];
        }));
        this.paginationInfo$ = this.videosPagedList$.pipe(pluck('pagination'));
    }
    loadMore() {
        this.paginationInfo$.pipe(first()).subscribe((pagination) => {
            this.loadPage$.next(pagination.nextPageToken);
        });
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss'],
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map
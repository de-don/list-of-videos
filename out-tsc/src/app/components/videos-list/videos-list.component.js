import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
/** Component to display list of videos */
let VideosListComponent = class VideosListComponent {
    constructor() {
        this.videos = [];
    }
};
__decorate([
    Input()
], VideosListComponent.prototype, "videos", void 0);
VideosListComponent = __decorate([
    Component({
        selector: 'app-videos-list',
        templateUrl: './videos-list.component.html',
        styleUrls: ['./videos-list.component.scss'],
    })
], VideosListComponent);
export { VideosListComponent };
//# sourceMappingURL=videos-list.component.js.map
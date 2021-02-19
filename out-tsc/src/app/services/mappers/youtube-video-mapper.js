import { __decorate } from "tslib";
import { Video } from '../../models/video';
import { Injectable } from '@angular/core';
let YoutubeVideoMapper = class YoutubeVideoMapper {
    fromDto(dto) {
        return new Video({
            id: dto.id,
            title: dto.snippet.title,
            previewImage: dto.snippet.thumbnails.maxres.url,
        });
    }
};
YoutubeVideoMapper = __decorate([
    Injectable({
        providedIn: 'root',
    })
], YoutubeVideoMapper);
export { YoutubeVideoMapper };
//# sourceMappingURL=youtube-video-mapper.js.map
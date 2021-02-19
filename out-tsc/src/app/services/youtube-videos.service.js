import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
/** Service to work with Youtube videos */
let YoutubeVideosService = class YoutubeVideosService {
    constructor(httpClient, youtubeVideoMapper) {
        this.httpClient = httpClient;
        this.youtubeVideoMapper = youtubeVideoMapper;
        this.url = 'https://www.googleapis.com/youtube/v3/videos';
    }
    getTopList(pageId) {
        return this.httpClient.get(this.url, {
            params: {
                key: environment.googleApiKey,
                maxResults: '5',
                chart: 'mostPopular',
                part: 'id,contentDetails,snippet',
                pageToken: pageId,
            },
        }).pipe(map(response => {
            const items = response.items.map(dto => this.youtubeVideoMapper.fromDto(dto));
            return {
                pagination: {
                    nextPageToken: response.nextPageToken,
                    prevPageToken: response.prevPageToken,
                },
                items,
            };
        }));
    }
};
YoutubeVideosService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], YoutubeVideosService);
export { YoutubeVideosService };
//# sourceMappingURL=youtube-videos.service.js.map
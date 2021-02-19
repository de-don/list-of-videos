import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PagedList } from '../models/paged-list';
import { Video } from '../models/video';
import { YoutubeClient } from '../utils/youtube-client';

import { AppConfigService } from './app-config.service';
import { YoutubeVideoDto } from './mappers/dtos/youtube-video.dto';
import { YoutubeVideoMapper } from './mappers/youtube-video-mapper';

interface YoutubeVideosListDto {
  items: YoutubeVideoDto[];
  nextPageToken?: string;
  prevPageToken?: string;
}

/** Service to work with Youtube videos */
@Injectable({
  providedIn: 'root',
})
export class YoutubeVideosService {
  private readonly client: YoutubeClient;
  private videoFields = 'id,contentDetails,snippet';

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly httpClient: HttpClient,
    private readonly youtubeVideoMapper: YoutubeVideoMapper,
  ) {
    this.client = new YoutubeClient(this.appConfigService.googleAPIKey, httpClient);
  }

  public getTopList(pageSize: number = 10, pageId?: string): Observable<PagedList<Video>> {
    return this.client.get<YoutubeVideosListDto>('videos', {
      maxResults: pageSize,
      part: this.videoFields,
      chart: 'mostPopular',
      pageToken: pageId,
    }).pipe(
      map(response => {
        const items = response?.items.map(dto => this.youtubeVideoMapper.fromDto(dto));
        return {
          prevPageToken: response?.prevPageToken,
          nextPageToken: response?.nextPageToken,
          items,
        };
      }),
    );
  }

  public getByIds(ids: string[]): Observable<PagedList<Video>> {
    return this.client.get<YoutubeVideosListDto>('videos', {
      id: ids.join(','),
      part: this.videoFields,
    }).pipe(
      map(response => {
        const items = response?.items.map(dto => this.youtubeVideoMapper.fromDto(dto));
        return {
          items,
        };
      }),
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video } from 'src/app/models/video';

import { PagedList } from '../models/paged-list';
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

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly httpClient: HttpClient,
    private readonly youtubeVideoMapper: YoutubeVideoMapper,
  ) {
    this.client = new YoutubeClient(this.appConfigService.googleAPIKey, httpClient);
  }

  public getTopList(pageId?: string): Observable<PagedList<Video>> {
    return this.client.get<YoutubeVideosListDto>('videos', {
      maxResults: '5',
      chart: 'mostPopular',
      part: 'id,contentDetails,snippet',
      ...(pageId ? { pageToken: pageId } : {}),
    }).pipe(
      map(response => {
        const items = response?.items.map(dto => this.youtubeVideoMapper.fromDto(dto));

        return {
          pagination: {
            nextPageToken: response?.nextPageToken,
            prevPageToken: response?.prevPageToken,
          },
          items,
        };
      }),
    );
  }

  public getByIds(ids: string[], pageId?: string): Observable<PagedList<Video>> {
    return this.client.get<YoutubeVideosListDto>('videos', {
      maxResults: '5',
      id: ids.join(','),
      part: 'id,contentDetails,snippet',
      ...(pageId ? { pageToken: pageId } : {}),
    }).pipe(
      map(response => {
        const items = response?.items.map(dto => this.youtubeVideoMapper.fromDto(dto));

        return {
          pagination: {
            nextPageToken: response?.nextPageToken,
            prevPageToken: response?.prevPageToken,
          },
          items,
        };
      }),
    );
  }
}

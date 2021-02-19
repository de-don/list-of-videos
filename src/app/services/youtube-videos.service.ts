import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from 'src/app/models/video';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { YoutubeVideoMapper } from './mappers/youtube-video-mapper';
import { YoutubeVideoDto } from './mappers/dtos/youtube-video.dto';
import { PagedList } from '../models/paged-list';

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
  private readonly url = 'https://www.googleapis.com/youtube/v3/videos';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly youtubeVideoMapper: YoutubeVideoMapper,
  ) {
  }

  public getTopList(pageId?: string): Observable<PagedList<Video>> {
    return this.httpClient.get<YoutubeVideosListDto>(this.url, {
      params: {
        key: environment.googleApiKey,
        maxResults: '5',
        chart: 'mostPopular',
        part: 'id,contentDetails,snippet',
        ...(pageId ? { pageToken: pageId} : {}),
      },
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

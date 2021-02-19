import { Component } from '@angular/core';
import { YoutubeVideosService } from './services/youtube-videos.service';
import { scan, shareReplay, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Video } from './models/video';
import { PagedList } from './models/paged-list';
import { PaginationData } from './models/pagination-data';

/**
 * App Component
 *
 * Bootstrap component for whole application
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public loadPage$ = new BehaviorSubject<string | undefined>(undefined);
  public paginationInfo: PaginationData | undefined;

  public videosPagedList$ = this.loadPage$.pipe(
    switchMap(pageId => this.youtubeVideosService.getTopList(pageId || undefined)),
    tap((pagedList) => this.paginationInfo = pagedList.pagination),
    shareReplay(1),
  );

  public videos$ = this.videosPagedList$.pipe(
    scan<PagedList<Video>, Video[]>((videos, pagedList) => {
      if (!pagedList.pagination.prevPageToken) {
        return pagedList.items;
      }
      return [...videos, ...pagedList.items];
    }, []),
    tap((v1) => console.log({ v1 })),
  );

  public favoriteIds: Set<string> = new Set<string>();

  constructor(
    private readonly youtubeVideosService: YoutubeVideosService,
  ) {
  }

  public isFavorite(video: Video): boolean {
    return this.favoriteIds.has(video.id);
  }

  public toggleFavorite(video: Video): void {
    if (this.favoriteIds.has(video.id)) {
      this.favoriteIds.delete(video.id);
      return;
    }
    this.favoriteIds.add(video.id);
  }

  public loadMore(): void {
    this.loadPage$.next(this.paginationInfo?.nextPageToken);
  }
}

import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { scan, shareReplay, switchMap, tap } from 'rxjs/operators';

import { PagedList } from './models/paged-list';
import { PaginationData } from './models/pagination-data';
import { Video } from './models/video';
import { AppConfigService } from './services/app-config.service';
import { StorageService } from './services/storage.service';
import { YoutubeVideosService } from './services/youtube-videos.service';

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
  public showFavorites = false;

  public videosPagedList$ = this.loadPage$.pipe(
    switchMap(pageId => {
      if (this.showFavorites) {
        return this.youtubeVideosService.getByIds([...this.favoriteIds], pageId);
      }
      return this.youtubeVideosService.getTopList(pageId);
    }),
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
    private readonly storageService: StorageService,
    private readonly appConfigService: AppConfigService,
  ) {
    const storedFavorites = this.storageService.get<string[]>(this.appConfigService.favoritesStorageKey);
    this.favoriteIds = new Set(storedFavorites ?? []);
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
    this.storageService.set(
      this.appConfigService.favoritesStorageKey,
      [...this.favoriteIds],
    );
  }

  public loadMore(): void {
    this.loadPage$.next(this.paginationInfo?.nextPageToken);
  }

  public showAll(): void {
    this.showFavorites = false;
    this.loadPage$.next(undefined);
  }

  public showOnlyFavorites(): void {
    this.showFavorites = true;
    this.loadPage$.next(undefined);
  }
}

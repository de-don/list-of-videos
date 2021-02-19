import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan, shareReplay, switchMap, tap } from 'rxjs/operators';

import { PagedList } from './models/paged-list';
import { Video } from './models/video';
import { AppConfigService } from './services/app-config.service';
import { StorageService } from './services/storage.service';
import { YoutubeVideosService } from './services/youtube-videos.service';

interface LoadPageCommand {
  pageToken: string | undefined;
  onlyFavorites: boolean;
}

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
  /** Token for loading more results */
  public nextPageToken: string | undefined;

  /** Show favorites state */
  public showFavorites = false;

  /** Page size */
  private readonly pageSize = 3;

  /** Subject with page token that need to load */
  private readonly loadPage$ = new BehaviorSubject<LoadPageCommand>({
    pageToken: undefined,
    onlyFavorites: this.showFavorites,
  });

  /** List ids of favorite videos */
  private favoriteIds: Set<string> = new Set<string>();

  /**
   * Paged list of Videos.
   * This stream contain information about latest loaded page with videos
   */
  public videosPagedList$: Observable<PagedList<Video>> = this.loadPage$.pipe(
    switchMap(command => {
      if (command.onlyFavorites) {
        return this.youtubeVideosService.getByIds([...this.favoriteIds]);
      }
      return this.youtubeVideosService.getTopList(this.pageSize, command.pageToken);
    }),
    tap((pagedList) => this.nextPageToken = pagedList.nextPageToken),
    shareReplay(1),
  );

  /**
   * Accumulated list of videos
   * This list accumulate items from videosPagedList$ until prevPageToken = undefined.
   * When prevPageToken = undefined, the array resets.
   */
  public videos$ = this.videosPagedList$.pipe(
    scan<PagedList<Video>, Video[]>((videos, pagedList) => {
      if (!pagedList.prevPageToken) {
        return pagedList.items;
      }
      return [...videos, ...pagedList.items];
    }, []),
  );

  public constructor(
    private readonly youtubeVideosService: YoutubeVideosService,
    private readonly storageService: StorageService,
    private readonly appConfigService: AppConfigService,
  ) {
    // Load favorites from local store
    const storedFavorites = this.storageService.get<string[]>(this.appConfigService.favoritesStorageKey);
    this.favoriteIds = new Set(storedFavorites ?? []);
  }

  /** Check that video is favorite */
  public isFavorite(video: Video): boolean {
    return this.favoriteIds.has(video.id);
  }

  /**
   * Toggle favorite video state and save new list to storage
   *
   * NOTE: when user remove favorite flag on favorite page, the item is not disappears
   * after removing the favorite flag, and disappears only after reloading videos list.
   */
  public toggleFavorite(video: Video): void {
    // Toggle state
    if (this.favoriteIds.has(video.id)) {
      this.favoriteIds.delete(video.id);
    } else {
      this.favoriteIds.add(video.id);
    }

    // Save to storage
    this.storageService.set(
      this.appConfigService.favoritesStorageKey,
      [...this.favoriteIds],
    );
  }

  /** Load more results */
  public loadMore(): void {
    this.loadPage$.next({
      pageToken: this.nextPageToken,
      onlyFavorites: this.showFavorites,
    });
  }

  /** Show all videos */
  public showAll(): void {
    this.showFavorites = false;
    this.loadPage$.next({
      pageToken: undefined,
      onlyFavorites: this.showFavorites,
    });
  }

  /** Show only favorite videos */
  public showOnlyFavorites(): void {
    this.showFavorites = true;
    this.loadPage$.next({
      pageToken: undefined,
      onlyFavorites: this.showFavorites,
    });
  }
}

import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

/**
 * Service to store application configuration
 */
@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  /** Prefix for persistent storage */
  public readonly storagePrefix = 'YT';

  /** Storage key for favorites */
  public readonly favoritesStorageKey = 'favorite_video_ids';

  /** Key for google API with Youtube permissions */
  public readonly googleAPIKey = environment.googleApiKey;
}

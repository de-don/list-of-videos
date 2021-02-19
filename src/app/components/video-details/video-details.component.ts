import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Video } from '../../models/video';

/** Component to display one video block */
@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
})
export class VideoDetailsComponent {
  /** Video to display */
  @Input()
  public video!: Video;

  /** Is this video favorite, or not */
  @Input()
  public isFavorite = false;

  /** Need to change favorite state */
  @Output()
  public toggleFavorite = new EventEmitter<Video>();
}

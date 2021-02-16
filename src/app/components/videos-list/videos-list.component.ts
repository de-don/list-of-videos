import { Component, Input } from '@angular/core';
import { Video } from '../../models/video';

/** Component to display list of videos */
@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.scss'],
})
export class VideosListComponent {
  @Input()
  public videos: Video[] = [];
}

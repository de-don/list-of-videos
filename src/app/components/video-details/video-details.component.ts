import { Component, Input } from '@angular/core';
import { Video } from 'src/app/models/video';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
})
export class VideoDetailsComponent {
  @Input()
  public video?: Video;
}

import { Component } from '@angular/core';
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
  public videos$ = this.youtubeVideosService.getTopList();

  constructor(
    private readonly youtubeVideosService: YoutubeVideosService,
  ) {
  }

}

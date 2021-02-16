import { YoutubeVideoDto } from './dtos/youtube-video.dto';
import { Video } from '../../models/video';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YoutubeVideoMapper {
  public fromDto(dto: YoutubeVideoDto): Video {
    return new Video({
      id: dto.id,
      title: dto.snippet.title,
      previewImage: dto.snippet.thumbnails.maxres.url,
    });
  }
}

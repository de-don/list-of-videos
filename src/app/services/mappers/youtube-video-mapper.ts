import { Injectable } from '@angular/core';

import { Video } from '../../models/video';

import { YoutubeVideoDto } from './dtos/youtube-video.dto';
import { MapperFromDTO } from './mappers';

/** Mapper YoutubeVideoDto => Video */
@Injectable({
  providedIn: 'root',
})
export class YoutubeVideoMapper implements MapperFromDTO<YoutubeVideoDto, Video> {
  public fromDto(dto: YoutubeVideoDto): Video {
    return new Video({
      id: dto.id,
      title: dto.snippet.title,
      previewImage: dto.snippet.thumbnails.standard?.url,
    });
  }
}

interface YoutubeVideoThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YoutubeVideoDto {
  id: string;
  snippet: {
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: YoutubeVideoThumbnail,
      medium: YoutubeVideoThumbnail,
      high: YoutubeVideoThumbnail,
      standard: YoutubeVideoThumbnail,
      maxres: YoutubeVideoThumbnail,
    }
  };
}

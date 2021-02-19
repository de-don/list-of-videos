/** Video initialization data */
interface VideoData {
  /** ID */
  id: string;
  /** Title */
  title: string;
  /** Image preview */
  previewImage?: string;
  /** Link to the video */
  link: string;
}

/** Video model that contain all information about the video */
export class Video {
  /** Id of the video */
  public id: string;

  /** Name of the video */
  public title: string;

  /** Preview Image */
  public previewImage?: string;

  /** Link to the video */
  public link: string;

  /** Initialize video instance */
  public constructor(data: VideoData) {
    this.id = data.id;
    this.title = data.title;
    this.previewImage = data.previewImage;
    this.link = data.link;
  }
}

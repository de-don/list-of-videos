import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type ParamValue = string | number | null | undefined;


interface Params {
  [key: string]: ParamValue;
}

interface ParamsNoUndefined {
  [key: string]: NonNullable<ParamValue>;
}

/** Remove null and undefined from params */
function removeNullParams(obj: Params): ParamsNoUndefined {
  const newObj = {...obj};
  Object.keys(newObj).forEach(key => newObj[key] === undefined ? delete newObj[key] : {});
  return newObj as ParamsNoUndefined;
}

/**
 * Client to work with youtube API
 */
export class YoutubeClient {
  private readonly baseUrl = 'https://www.googleapis.com/youtube/v3/';

  /**
   * Initialize youtube client.
   *
   * @param apiKey google api key
   * @param httpClient http client
   */
  public constructor(
    private readonly apiKey: string,
    private readonly httpClient: HttpClient,
  ) {
  }

  /**
   * Call get method
   * @param methodName method name, like "videos"
   * @param params object with params
   */
  public get<T>(methodName: string, params: Params): Observable<T> {
    return this.httpClient.get<T>(this.generateMethodUrl(methodName), {
      params: {
        key: this.apiKey,
        ...removeNullParams(params),
      },
    });
  }

  /** Generate url for method */
  private generateMethodUrl(methodName): string {
    return this.baseUrl + methodName;
  }
}

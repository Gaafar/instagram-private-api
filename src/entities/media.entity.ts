import axios from 'axios';
import { Entity } from '../core/entity';
import { MediaEntityOembedResponse } from '../responses';

export class MediaEntity extends Entity {
  static async oembed(url: string): Promise<MediaEntityOembedResponse> {
    // TODO: test with axios
    const { data } = await axios({
      url: 'https://api.instagram.com/oembed/',
      params: {
        url,
      },
    });

    return data;
  }
}

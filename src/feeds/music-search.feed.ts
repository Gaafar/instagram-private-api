import { Feed } from '../core/feed';
import { IgAppModule } from '../types/common.types';
import { MusicSearchFeedResponseItemsItem, MusicSearchFeedResponseRootObject } from '../responses';
import { Expose } from 'class-transformer';

export class MusicSearchFeed extends Feed<MusicSearchFeedResponseRootObject, MusicSearchFeedResponseItemsItem> {
  @Expose()
  protected nextCursor?: string;

  @Expose()
  public product: IgAppModule;
  @Expose()
  public query: string;
  @Expose()
  public searchSessionId: string;

  async items(): Promise<MusicSearchFeedResponseItemsItem[]> {
    const response = await this.request();
    return response.items;
  }

  async request(): Promise<MusicSearchFeedResponseRootObject> {
    const { data } = await this.client.request.send<MusicSearchFeedResponseRootObject>({
      url: '/api/v1/music/search/',
      method: 'POST',
      data: {
        cursor: this.nextCursor || '0',
        _csrftoken: this.client.state.cookieCsrfToken,
        product: this.product,
        _uuid: this.client.state.uuid,
        browse_session_id: this.client.state.clientSessionId,
        search_session_id: this.searchSessionId,
        q: this.query,
      },
    });
    this.state = data;
    return data;
  }

  protected set state(response: any) {
    this.nextCursor = response.page_info.next_max_id;
    this.moreAvailable = response.page_info.more_available;
  }

  isMoreAvailable(): boolean {
    return this.moreAvailable;
  }
}

import { Repository } from '../core/repository';
import {
  FbsearchRepositoryPlacesResponseRootObject,
  FbsearchRepositoryTopsearchFlatResponseRootObject,
} from '../responses';

export class FbsearchRepository extends Repository {
  async suggestedSearches(type: 'blended' | 'users' | 'hashtags' | 'places') {
    const { data } = await this.client.request.send({
      url: '/api/v1/fbsearch/suggested_searches/',
      params: {
        type,
      },
    });
    return data;
  }
  async recentSearches() {
    const { data } = await this.client.request.send({
      url: '/api/v1/fbsearch/recent_searches/',
    });
    return data;
  }

  async topsearchFlat(query: string): Promise<FbsearchRepositoryTopsearchFlatResponseRootObject> {
    const { data } = await this.client.request.send<FbsearchRepositoryTopsearchFlatResponseRootObject>({
      url: '/api/v1/fbsearch/topsearch_flat/',
      params: {
        timezone_offset: this.client.state.timezoneOffset,
        count: 30,
        query,
        context: 'blended',
      },
    });
    return data;
  }
  async places(query: string) {
    const { data } = await this.client.request.send<FbsearchRepositoryPlacesResponseRootObject>({
      url: '/api/v1/fbsearch/places/',
      params: {
        timezone_offset: this.client.state.timezoneOffset,
        count: 30,
        query,
      },
    });
    return data;
  }
}

import { Repository } from '../core/repository';
import {
  DirectThreadRepositoryAddUserResponseRootObject,
  DirectThreadRepositoryBroadcastResponseRootObject,
  DirectThreadRepositoryGetByParticipantsResponseRootObject,
  DirectThreadRepositoryUpdateTitleResponseRootObject,
  StatusResponse,
} from '../responses';
import { DirectThreadBroadcastOptions } from '../types';
import Chance = require('chance');
import { DirectThreadRepositoryApproveParticipantRequestResponseRootObject } from '../responses';

export class DirectThreadRepository extends Repository {
  public async approve(threadId: string | number): Promise<StatusResponse> {
    const { data } = await this.client.request.send<StatusResponse>({
      url: `/api/v1/direct_v2/threads/${threadId}/approve/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      },
    });
    return data;
  }

  public async approveMultiple(threadIds: string[] | number[]): Promise<StatusResponse> {
    const { data } = await this.client.request.send<StatusResponse>({
      url: '/api/v1/direct_v2/threads/approve_multiple/',
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
        thread_ids: JSON.stringify(threadIds),
      },
    });
    return data;
  }

  public async decline(threadId: string | number): Promise<StatusResponse> {
    const { data } = await this.client.request.send<StatusResponse>({
      url: `/api/v1/direct_v2/threads/${threadId}/decline/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      },
    });
    return data;
  }

  public async declineMultiple(threadIds: string[] | number[]): Promise<StatusResponse> {
    const { data } = await this.client.request.send<StatusResponse>({
      url: '/api/v1/direct_v2/threads/decline_multiple/',
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
        thread_ids: JSON.stringify(threadIds),
      },
    });
    return data;
  }

  public async declineAll(): Promise<StatusResponse> {
    const { data } = await this.client.request.send<StatusResponse>({
      url: `/api/v1/direct_v2/threads/decline_all/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      },
    });
    return data;
  }

  public async approveParticipantRequests(
    threadId: string | number,
    userIds: string[],
  ): Promise<DirectThreadRepositoryApproveParticipantRequestResponseRootObject> {
    const { data } = await this.client.request.send<DirectThreadRepositoryApproveParticipantRequestResponseRootObject>({
      url: `/api/v1/direct_v2/threads/${threadId}/approve_participant_requests/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        user_ids: JSON.stringify(userIds),
        share_join_chat_story: true,
        _uuid: this.client.state.uuid,
      },
    });
    return data;
  }

  // move to direct-repo?
  public async getByParticipants(
    recipientUsers: string[] | number[],
  ): Promise<DirectThreadRepositoryGetByParticipantsResponseRootObject> {
    const { data } = await this.client.request.send<DirectThreadRepositoryGetByParticipantsResponseRootObject>({
      url: '/api/v1/direct_v2/threads/get_by_participants/',
      method: 'GET',
      params: {
        recipient_users: JSON.stringify(recipientUsers),
      },
    });
    return data;
  }

  public async updateTitle(
    threadId: string | number,
    title: string,
  ): Promise<DirectThreadRepositoryUpdateTitleResponseRootObject> {
    const { data } = await this.client.request.send<DirectThreadRepositoryUpdateTitleResponseRootObject>({
      url: `/api/v1/direct_v2/threads/${threadId}/update_title/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
        title,
      },
    });
    return data;
  }

  public async mute(threadId: string | number): Promise<StatusResponse> {
    const { data } = await this.client.request.send<StatusResponse>({
      url: `/api/v1/direct_v2/threads/${threadId}/mute/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      },
    });
    return data;
  }

  public async unmute(threadId: string | number): Promise<StatusResponse> {
    const { data } = await this.client.request.send<StatusResponse>({
      url: `/api/v1/direct_v2/threads/${threadId}/unmute/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      },
    });
    return data;
  }

  public async addUser(
    threadId: string | number,
    userIds: string[] | number[],
  ): Promise<DirectThreadRepositoryAddUserResponseRootObject> {
    const { data } = await this.client.request.send<DirectThreadRepositoryAddUserResponseRootObject>({
      url: `/api/v1/direct_v2/threads/${threadId}/add_user/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        user_ids: JSON.stringify(userIds),
        _uuid: this.client.state.uuid,
      },
    });
    return data;
  }

  public async leave(threadId: string): Promise<StatusResponse> {
    const { data } = await this.client.request.send<StatusResponse>({
      url: `/api/v1/direct_v2/threads/${threadId}/leave/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      },
    });
    return data;
  }

  public async hide(threadId: string): Promise<StatusResponse> {
    const { data } = await this.client.request.send<StatusResponse>({
      url: `/api/v1/direct_v2/threads/${threadId}/hide/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
        use_unified_inbox: true,
      },
    });
    return data;
  }

  public async markItemSeen(threadId: string, threadItemId: string) {
    const { data } = await this.client.request.send<StatusResponse>({
      url: `/api/v1/direct_v2/threads/${threadId}/items/${threadItemId}/seen/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
        use_unified_inbox: true,
        action: 'mark_seen',
        thread_id: threadId,
        item_id: threadItemId,
      },
    });
    return data;
  }

  public async broadcast(
    options: DirectThreadBroadcastOptions,
  ): Promise<DirectThreadRepositoryBroadcastResponseRootObject> {
    const mutationToken = new Chance().guid();
    const recipients = options.threadIds || options.userIds;
    const recipientsType = options.threadIds ? 'thread_ids' : 'recipient_users';
    const recipientsIds = recipients instanceof Array ? recipients : [recipients];

    const form = {
      action: 'send_item',
      [recipientsType]: JSON.stringify(recipientsType === 'thread_ids' ? recipientsIds : [recipientsIds]),
      client_context: mutationToken,
      _csrftoken: this.client.state.cookieCsrfToken,
      device_id: this.client.state.deviceId,
      mutation_token: mutationToken,
      _uuid: this.client.state.uuid,
      ...options.form,
    };

    const { data } = await this.client.request.send<DirectThreadRepositoryBroadcastResponseRootObject>({
      url: `/api/v1/direct_v2/threads/broadcast/${options.item}/`,
      method: 'POST',
      data: options.signed ? this.client.request.sign(form) : form,
      params: options.qs,
    });
    return data;
  }

  public async deleteItem(threadId: string | number, itemId: string | number): Promise<StatusResponse> {
    const { data } = await this.client.request.send({
      url: `/api/v1/direct_v2/threads/${threadId}/items/${itemId}/delete/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      },
    });
    return data;
  }
}

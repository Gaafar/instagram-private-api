import { Repository } from '../core/repository';
import Chance = require('chance');
import {
  LiveSwitchCommentsResponseRootObject,
  LiveCreateBroadcastResponseRootObject,
  LiveStartBroadcastResponseRootObject,
  LiveCommentsResponseRootObject,
  LiveHeartbeatViewerCountResponseRootObject,
  LiveInfoResponseRootObject,
  LiveFinalViewersResponseRootObject,
  LiveViewerListResponseRootObject,
  LiveGetQuestionsResponseRootObject,
  LiveLikeResponseRootObject,
  LiveLikeCountResponseRootObject,
  LiveJoinRequestCountsResponseRootObject,
  LiveAddToPostResponse,
} from '../responses';

export class LiveRepository extends Repository {
  public async muteComment(broadcastId: string): Promise<LiveSwitchCommentsResponseRootObject> {
    const { data } = await this.client.request.send<LiveSwitchCommentsResponseRootObject>({
      url: `/api/v1/live/${broadcastId}/mute_comment/`,
      method: 'POST',
      data: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
      }),
    });
    return data;
  }

  public async getComment({
    broadcastId,
    commentsRequested = 4,
    lastCommentTs,
  }: {
    broadcastId: string;
    commentsRequested?: number;
    lastCommentTs?: string | number;
  }): Promise<LiveCommentsResponseRootObject> {
    const { data } = await this.client.request.send<LiveCommentsResponseRootObject>({
      url: `/api/v1/live/${broadcastId}/get_comment/`,
      method: 'GET',
      params: {
        num_comments_requested: commentsRequested,
        last_comment_ts: lastCommentTs || 0,
      },
    });
    return data;
  }

  public async heartbeatAndGetViewerCount(broadcastId: string): Promise<LiveHeartbeatViewerCountResponseRootObject> {
    const { data } = await this.client.request.send<LiveHeartbeatViewerCountResponseRootObject>({
      url: `/api/v1/live/${broadcastId}/heartbeat_and_get_viewer_count/`,
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        offset_to_video_start: 0,
        _uuid: this.client.state.uuid,
      },
      method: 'POST',
    });
    return data;
  }

  public async info(broadcastId: string): Promise<LiveInfoResponseRootObject> {
    const { data } = await this.client.request.send<LiveInfoResponseRootObject>({
      url: `/api/v1/live/${broadcastId}/info/`,
      method: 'GET',
    });
    return data;
  }

  public async getFinalViewerList(broadcastId: string): Promise<LiveFinalViewersResponseRootObject> {
    const { data } = await this.client.request.send<LiveFinalViewersResponseRootObject>({
      url: `api/v1/live/${broadcastId}/get_final_viewer_list/`,
      method: 'GET',
    });
    return data;
  }

  public async unmuteComment(broadcastId: string): Promise<LiveSwitchCommentsResponseRootObject> {
    const { data } = await this.client.request.send<LiveSwitchCommentsResponseRootObject>({
      url: `/api/v1/live/${broadcastId}/unmute_comment/`,
      method: 'POST',
      data: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
      }),
    });
    return data;
  }

  public async create({
    previewHeight = 1184,
    previewWidth = 720,
    message = '',
  }: {
    previewHeight?: number | string;
    previewWidth?: number | string;
    message?: string;
  }): Promise<LiveCreateBroadcastResponseRootObject> {
    const { data } = await this.client.request.send<LiveCreateBroadcastResponseRootObject>({
      url: '/api/v1/live/create/',
      method: 'POST',
      data: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
        preview_width: previewWidth,
        preview_height: previewHeight,
        broadcast_message: message,
        // const?
        broadcast_type: 'RTMP',
        internal_only: 0,
      }),
    });
    return data;
  }

  public async getViewerList(broadcastId: string): Promise<LiveViewerListResponseRootObject> {
    const { data } = await this.client.request.send<LiveViewerListResponseRootObject>({
      url: `/api/v1/live/${broadcastId}/get_viewer_list/`,
      method: 'GET',
    });
    return data;
  }

  public async createQuestion(broadcastId: string, question: string): Promise<any> {
    // TODO: not enabled?
    const { data } = await this.client.request.send({
      url: `/api/v1/live/${broadcastId}/questions/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
        text: question,
      },
    });
    return data;
  }

  public async activateQuestion(broadcastId: string, questionId: string) {
    // TODO: not working on client / while using obs -> useless?
    const { data } = await this.client.request.send({
      url: `/api/v1/live/${broadcastId}/question/${questionId}/activate/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      },
    });
    return data;
  }

  public async deactivateQuestion(broadcastId: string, questionId: string) {
    const { data } = await this.client.request.send({
      url: `/api/v1/live/${broadcastId}/question/${questionId}/deactivate/`,
      method: 'POST',
      data: {
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
      },
    });
    return data;
  }

  public async getQuestions(): Promise<LiveGetQuestionsResponseRootObject> {
    const { data } = await this.client.request.send<LiveGetQuestionsResponseRootObject>({
      url: '/api/v1/live/get_questions/',
      method: 'GET',
    });
    return data;
  }

  public async wave(broadcastId: string, viewerId: string) {
    const { data } = await this.client.request.send({
      url: `/api/v1/live/${broadcastId}/wave/`,
      method: 'POST',
      data: this.client.request.sign({
        viewer_id: viewerId,
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
      }),
    });
    return data;
  }

  public async like(broadcastId: string, likeCount: number = 1): Promise<LiveLikeResponseRootObject> {
    const { data } = await this.client.request.send<LiveLikeResponseRootObject>({
      url: `/api/v1/live/${broadcastId}/like/`,
      method: 'POST',
      data: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
        user_like_count: likeCount,
      }),
    });
    return data;
  }

  public async getLikeCount(
    broadcastId: string,
    likeTs: string | number = 0,
  ): Promise<LiveLikeCountResponseRootObject> {
    const { data } = await this.client.request.send<LiveLikeCountResponseRootObject>({
      url: `/api/v1/live/${broadcastId}/get_like_count/`,
      method: 'GET',
      params: {
        like_ts: likeTs,
      },
    });
    return data;
  }

  public async resumeBroadcastAfterContentMatch(broadcastId: string): Promise<any> {
    // TODO: test
    const { data } = await this.client.request.send({
      url: `/api/v1/live/${broadcastId}/resume_broadcast_after_content_match/`,
      method: 'POST',
      data: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
      }),
    });
    return data;
  }

  public async getJoinRequestCounts({
    broadcastId,
    lastTotalCount = 0,
    lastSeenTs = 0,
    lastFetchTs = 0,
  }: {
    broadcastId: string;
    lastTotalCount: number | string;
    lastSeenTs: number | string;
    lastFetchTs: number | string;
  }): Promise<LiveJoinRequestCountsResponseRootObject> {
    const { data } = await this.client.request.send<LiveJoinRequestCountsResponseRootObject>({
      url: `/api/v1/live/${broadcastId}/get_join_request_counts/`,
      method: 'GET',
      params: {
        last_total_count: lastTotalCount,
        last_seen_ts: lastSeenTs,
        last_fetch_ts: lastFetchTs,
      },
    });
    return data;
  }

  public async start(
    broadcastId: string,
    sendNotifications: boolean = true,
  ): Promise<LiveStartBroadcastResponseRootObject> {
    const { data } = await this.client.request.send<LiveStartBroadcastResponseRootObject>({
      url: `/api/v1/live/${broadcastId}/start/`,
      method: 'POST',
      data: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uuid: this.client.state.uuid,
        should_send_notifications: sendNotifications,
      }),
    });
    return data;
  }

  public async endBroadcast(broadcastId: string, endAfterCopyrightWarning: boolean = false) {
    const { data } = await this.client.request.send({
      url: `/api/v1/live/${broadcastId}/end_broadcast/`,
      method: 'POST',
      data: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
        end_after_copyright_warning: endAfterCopyrightWarning,
      }),
    });
    return data;
  }

  public async comment(broadcastId: string, message: string): Promise<any> {
    const { data } = await this.client.request.send({
      url: `/api/v1/live/${broadcastId}/comment/`,
      method: 'POST',
      data: this.client.request.sign({
        user_breadcrumb: this.client.request.userBreadcrumb(message.length),
        idempotence_token: new Chance().guid(),
        comment_text: message,
        live_or_vod: '1',
        offset_to_video_start: '0',
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
      }),
    });
    return data;
  }

  public async pinComment(broadcastId: string, commentId: string): Promise<any> {
    const { data } = await this.client.request.send({
      url: `/api/v1/live/${broadcastId}/pin_comment/`,
      method: 'POST',
      data: this.client.request.sign({
        offset_to_video_start: 0,
        comment_id: commentId,
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
      }),
    });
    return data;
  }

  public async unpinComment(broadcastId: string, commentId: string): Promise<any> {
    const { data } = await this.client.request.send({
      url: `/api/v1/live/${broadcastId}/unpin_comment/`,
      method: 'POST',
      data: this.client.request.sign({
        offset_to_video_start: 0,
        comment_id: commentId,
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
      }),
    });
    return data;
  }

  public async getLiveQuestions(broadcastId: string): Promise<any> {
    const { data } = await this.client.request.send({
      url: `/api/v1/live/${broadcastId}/questions/`,
      method: 'POST',
      data: this.client.request.sign({
        sources: 'story_and_live',
      }),
    });
    return data;
  }

  public async addToPostLive(broadcastId: string): Promise<LiveAddToPostResponse> {
    const { data } = await this.client.request.send({
      url: `/api/v1/live/${broadcastId}/add_to_post_live/`,
      method: 'POST',
      data: this.client.request.sign({
        _csrftoken: this.client.state.cookieCsrfToken,
        _uid: this.client.state.cookieUserId,
        _uuid: this.client.state.uuid,
      }),
    });
    return data;
  }

  /**
   * Shows all online users, ready to watch your stream
   */
  public async getLivePresence(): Promise<any> {
    const { data } = await this.client.request.send({
      url: '/api/v1/live/get_live_presence/',
      method: 'GET',
    });
    return data;
  }
}

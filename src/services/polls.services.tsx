import { api } from "../api/client";
import { EP } from "../api/endpoints";
import { Poll,GetAllPollsResponse,GetPollByIdResponse, VoteRequest, VoteResponse } from "../api/types";

export const PollsService = {
  async getAll(): Promise<GetAllPollsResponse> {
    const { data } = await api.get<GetAllPollsResponse>(EP.polls.list);
    return data;
  },

  async getById(id: number): Promise<GetPollByIdResponse> {
    const { data } = await api.get<GetPollByIdResponse>(EP.polls.detail(id));
    return data;
  },

  async vote(id: number, payload: VoteRequest): Promise<VoteResponse> {
    const { data } = await api.post<VoteResponse>(EP.polls.vote(id), payload);
    return data;
  },
};
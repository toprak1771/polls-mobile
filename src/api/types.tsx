// src/api/types.ts
export interface PollOption {
  id: string;    
  text: string;        
  votes: number;       
}

export interface Poll {
  id: number;
  question: string;
  options: PollOption[];
  createdAt?: string;
  expiresAt?: string | null;
}

export type GetAllPollsResponse = {
  polls: Poll[];
};
export type GetPollByIdResponse = Poll;

export interface VoteRequest {
  optionId: string;
}

export interface VoteResponse {
  success: boolean;
  poll: Poll;
}

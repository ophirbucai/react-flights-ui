export type APIResponse<T> = {
  status: boolean;
  timestamp: number;
  sessionId?: string;
  data: T;
};

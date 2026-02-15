export interface User {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
}

export interface Template {
  id: number;
  user_id: number;
  name: string;
  description: string;
  formula: string;
  variables: Record<string, string>;
  share_id: string;
  created_at: string;
}

// Laravelの422エラーレスポンス用の型
export type Api422ErrorResponse = {
  errors: Record<string, string[]>; // フィールドごとのエラーメッセージ
};

export type RegistRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type CheckLoginedResponse = {
  is_logined: boolean;
};

export type CreateLineAuthUrlResponse = {
  url: string;
};

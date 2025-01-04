export type LoginRequest = {
  email: string;
  password: string;
};

export type CheckLoginedResponse = {
  is_logined: boolean;
};

// Fields to be filled on the Sign In Form.
export interface SignUpFormFields {
  name: string;
  password: string;
  username: string;
}

// Fields the API returns with an error.
export interface SignUpErrors {
  password: string;
  username: string;
}

// Fields to be filled on the Sign In Form.
export interface SignInFormFields {
  password: string;
  username: string;
}

// Fields the API returns with an error.
export interface SignInErrors {
  non_field_errors: string;
}

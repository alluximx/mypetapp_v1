// Fields to be filled on the Sign In Form.
export interface SignInFormFields {
  email: string;
  password: string;
}

// Fields the API returns with an error.
export interface SignInErrors {
  password: string;
  non_field_errors: string;
  detail: string;
}

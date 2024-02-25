import ApiInstance, { Slug } from '../api';
import * as Types from '../api.types';

export async function login(
  credentials: Types.Login,
): Promise<Types.GetAuthenticationResult> {
  const result = await ApiInstance.post<Types.AuthenticationResult>({
    slug: Slug.login,
    formData: credentials,
  });
  return result;
}

import ApiInstance, { Slug } from '../api';
import * as Types from '../api.types';

export async function register(
  userDetails: Types.Register,
): Promise<Types.GetAuthenticationResult> {
  const result = await ApiInstance.post<Types.AuthenticationResult>({
    slug: Slug.login,
    formData: userDetails,
  });
  return result;
}

import ApiInstance, { Slug } from '../api';
import * as Types from '../api.types';

export async function newsResult(
  query: string,
): Promise<Types.GetAuthenticationResult> {
  const result = await ApiInstance.get<Types.AuthenticationResult>({
    // slug: Slug.news,
    headers: '&apiKey=51cb02c7fab14118ba5b2859393b6c60',
    queryParameters: `?q=${query}&from=2022-07-14&sortBy=popularity`,
  });
  return result;
}

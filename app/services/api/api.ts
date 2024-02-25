import { ApisauceInstance, create } from 'apisauce';
import { getGeneralApiProblem } from './api-problem';
import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import { GeneralApiProblem } from './api-problem';

export enum Slug {
  login = '/login',
  register = '/register',
  news = '/everything',
}

export interface APIParameters {
  slug?: Slug;
  queryParameters?: string;
  formData?: Object;
  headers?: Object;
}

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  async get<T>({
    // slug,
    headers = {},
    queryParameters,
  }: APIParameters): Promise<T | GeneralApiProblem> {
    return this.apisauce.get(queryParameters + headers).then(response => {
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }
      try {
        return response.data as T;
      } catch (e) {
        return { kind: 'bad-data' };
      }
    });
  }

  async post<T>({
    slug,
    headers = {},
    formData = null,
  }: APIParameters): Promise<T | GeneralApiProblem> {
    return this.apisauce
      .post(slug, formData, {
        headers,
      })
      .then(response => {
        if (!response.ok) {
          const problem = getGeneralApiProblem(response);
          if (problem) {
            return problem;
          }
        }
        try {
          return <T>response.data;
        } catch (e) {
          return { kind: 'bad-data' };
        }
      });
  }

  async put<T>({
    slug,
    headers = {},
    formData = null,
  }: APIParameters): Promise<T | GeneralApiProblem> {
    return this.apisauce.put(slug, formData, { headers }).then(response => {
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }
      try {
        return <T>response.data;
      } catch (e) {
        return { kind: 'bad-data' };
      }
    });
  }
}

const ApiInstance = new Api();
ApiInstance.setup();
export default ApiInstance;

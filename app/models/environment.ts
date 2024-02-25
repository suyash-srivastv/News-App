import { baseApi } from "../services/api";

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */

const environment = {
  baseApi,
};

export type Environment = typeof environment;
export default environment;

import { NestedObjectLeaves } from '../common/types';
import * as en from './en.json';

export type Scope = NestedObjectLeaves<typeof en>;

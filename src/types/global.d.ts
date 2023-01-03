import { resStatusCode } from '@/utils/index';
declare global {
  interface ResponseData<T = any> {
    code: resStatusCode;
    msg: string;
    data: T;
  }
}
export {};

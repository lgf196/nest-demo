import { resStatusCode } from '@/utils/index';
declare global {
  interface ResponseData<T = any> {
    code: resStatusCode;
    message: string;
    data: T;
  }
}
export {};

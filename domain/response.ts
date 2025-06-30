/** @format */

export interface ResponseData {
  status: number;
  message: string;
  data?: any;
  errors?:
    | {
        [key: string]: string[] | undefined;
      }
    | undefined;
}

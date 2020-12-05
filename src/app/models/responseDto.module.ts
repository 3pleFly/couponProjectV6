export interface ResponseDto<T> {
  t: T;
  success: boolean;
  message: string;
  classType: string;
}

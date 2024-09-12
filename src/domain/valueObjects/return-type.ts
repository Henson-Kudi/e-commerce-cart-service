import ErrorClass from './error';

export class ReturnType<Data = unknown> {
  constructor(
    success: boolean,
    message?: string,
    data?: Data,
    error?: ErrorClass
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  success: boolean;
  message?: string;
  data?: Data;
  error?: ErrorClass;
}

export interface PaginationData<Data> {
  limit: number;
  total: number;
  page: number;
  data: Data;
}

export class ReturnTypeWithPagination<Data = unknown> {
  constructor(
    success: boolean,
    message?: string,
    data?: PaginationData<Data>,
    error?: ErrorClass
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  success: boolean;
  message?: string;
  data?: PaginationData<Data>;
  error?: ErrorClass;
}

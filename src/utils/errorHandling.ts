import axios, { AxiosError } from 'axios';

/**
 * Error types for better error handling
 */
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

/**
 * Custom error class with additional metadata
 */
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode?: number;
  public readonly details?: any;

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN,
    statusCode?: number,
    details?: any
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * Converts axios error to AppError
 */
export const handleApiError = (error: unknown): AppError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (!axiosError.response) {
      return new AppError(
        'Network error. Please check your connection.',
        ErrorType.NETWORK
      );
    }

    const { status, data } = axiosError.response;

    switch (status) {
      case 400:
        return new AppError(
          data?.message || 'Invalid request data.',
          ErrorType.VALIDATION,
          status,
          data
        );
      case 401:
        return new AppError(
          'Authentication required. Please log in.',
          ErrorType.AUTHENTICATION,
          status,
          data
        );
      case 403:
        return new AppError(
          'Access denied. You do not have permission.',
          ErrorType.AUTHORIZATION,
          status,
          data
        );
      case 404:
        return new AppError(
          'Resource not found.',
          ErrorType.NOT_FOUND,
          status,
          data
        );
      case 500:
      case 502:
      case 503:
      case 504:
        return new AppError(
          'Server error. Please try again later.',
          ErrorType.SERVER,
          status,
          data
        );
      default:
        return new AppError(
          data?.message || 'An unexpected error occurred.',
          ErrorType.UNKNOWN,
          status,
          data
        );
    }
  }

  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, ErrorType.UNKNOWN);
  }

  return new AppError('An unexpected error occurred.', ErrorType.UNKNOWN);
};

/**
 * Logs error with appropriate level
 */
export const logError = (error: AppError | Error, context?: string): void => {
  const message = context ? `[${context}] ${error.message}` : error.message;

  if (error instanceof AppError) {
    switch (error.type) {
      case ErrorType.NETWORK:
      case ErrorType.SERVER:
        console.error(message, error.details);
        break;
      case ErrorType.VALIDATION:
      case ErrorType.AUTHENTICATION:
      case ErrorType.AUTHORIZATION:
        console.warn(message, error.details);
        break;
      default:
        console.error(message, error.details);
    }
  } else {
    console.error(message, error);
  }
};

/**
 * User-friendly error message getter
 */
export const getErrorMessage = (error: unknown): string => {
  const appError = handleApiError(error);
  return appError.message;
};
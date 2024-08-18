export interface PaginationState {
  totalData: number;
  dataPerpage: number;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  paginationState: PaginationState;
  data: T[];
  additionalInfo?: Record<string, any>;
}

const paginatedResponse = <T>(
  data: T[],
  page: number,
  limit: number,
  totalData: number,
  additionalInfo?: Record<string, any>
) => {
  const totalPages = Math.ceil(totalData / limit);
  const startIndex = (page - 1) * limit + 1;
  const endIndex = page * limit > totalData ? totalData : page * limit;

  const paginationState: PaginationState = {
    totalData,
    dataPerpage: limit,
    currentPage: page,
    totalPages,
    startIndex,
    endIndex,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };

  const response: PaginatedResponse<T> = {
    data,
    paginationState,
    additionalInfo,
  };

  return response;
};

export default paginatedResponse;

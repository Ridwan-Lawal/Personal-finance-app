export interface Query {
  query: {
    page?: string | undefined;
    category?: string | undefined;
    sortby?: string | undefined;
    search?: string | undefined;
  };
}

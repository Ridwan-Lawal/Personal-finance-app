export interface Query {
  query: {
    page?: string | undefined;
    category?: string | undefined;
    sortby?: string | undefined;
    search?: string | undefined;
  };
}

export interface ActionState {
  state:
    | {
        success: boolean;
        message: string;
        errors?: undefined;
        inputs?: undefined;
      }
    | {
        errors: {
          amountToAdd?: string[] | undefined;
        };
        inputs: {
          amountToAdd: number;
        };
        success?: undefined;
        message?: undefined;
      }
    | null;
}

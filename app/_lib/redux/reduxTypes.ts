export interface StoreType {
  budgetSliceStore: {
    isModalOpen: boolean;
    isEditModalOpen: boolean;
    isDeleteModalOpen: boolean;
    budgetToEdit: string;
    budgetToDelete: {
      budgetId: string;
      budgetCategory: string;
    };
  };
}

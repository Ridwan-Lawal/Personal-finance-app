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

  potSliceStore: {
    isAddNewPotModalOpen: boolean;
    isEditPotModalOpen: boolean;
    isDeletePotModalOpen: boolean;
    potToEditId: string;
    potToDelete: {
      potId: string;
      potName: string;
    };
    isAddMoneyModalOpen: boolean;
    potToAddMoney: {
      potId: string;
      potName: string;
    };
    isWithdrawMoneyModalOpen: boolean;
    potToWithdrawMoney: {
      potId: string;
      potName: string;
    };
  };
}

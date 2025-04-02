"use client";

import FormOverview from "@/app/_components/pots/FormOverview";
import PotsFormInput from "@/app/_components/pots/PotsFormInput";
import { addMoneyToPotAction } from "@/app/_lib/actions/potActions";
import {
  getPotsSliceReducer,
  onUpdateAddMoneyModalOpening,
} from "@/app/_lib/redux/potsSlice";
import cancelIcon from "@/public/icon-close-modal.svg";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function AddMoneyForm() {
  const [state, formAction, isAddingMoney] = useActionState(
    addMoneyToPotAction,
    null,
  );
  const { errors, inputs } = state ?? {};

  const { isAddMoneyModalOpen, potToAddMoney } =
    useSelector(getPotsSliceReducer);
  const dispatch = useDispatch();

  const [amountToAdd, setAmountToAdd] = useState(5);

  useEffect(() => {
    function onBlurModal(e: Event) {
      const target = e.target as HTMLElement;
      if (!target.closest(".form-block") && !target.closest(".add-money-btn")) {
        dispatch(
          onUpdateAddMoneyModalOpening({
            modalOpen: false,
            potId: "",
            potName: "",
          }),
        );
      }
    }

    window.addEventListener("click", onBlurModal);

    return () => window.removeEventListener("click", onBlurModal);
  }, [dispatch]);

  useEffect(() => {
    if (state) {
      if (state?.success) {
        toast.success(state?.message);
        dispatch(
          onUpdateAddMoneyModalOpening({
            modalOpen: false,
            potId: "",
            potName: "",
          }),
        );
      } else if (state?.success === false) {
        toast.error(state?.message);
      }
    }
  }, [state, dispatch]);

  return (
    <AnimatePresence>
      {isAddMoneyModalOpen && (
        <motion.div
          className={`form fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-black/20 px-6 backdrop-blur-[2px]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeIn", duration: 0.2 }}
        >
          {/* Form block */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ ease: "easeIn" }}
            className={`form-block max-w-[560px] space-y-5 rounded-xl bg-white px-5 py-6 shadow-md md:px-8 md:py-8`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-preset-1-2 text-grey-900 border capitalize">
                Add to &lsquo;{potToAddMoney?.potName}&rsquo;
              </h2>

              <Image
                src={cancelIcon}
                alt="cancel-icon"
                className="cursor-pointer"
                onClick={() =>
                  dispatch(
                    onUpdateAddMoneyModalOpening({
                      modalOpen: false,
                      potId: "",
                      potName: "",
                    }),
                  )
                }
              />
            </div>
            <p className="text-preset-4 text-grey-500">
              Add money to your pot to keep it separate from your main balance.
              As soon as you add this money, it will be deducted from your
              current balance.
            </p>

            <FormOverview
              potTheme={{ bg: "bg-green", text: "text-green" }}
              amountToAdd={amountToAdd}
              potToAddorWithdrawMoney={potToAddMoney}
            />

            {/* form */}
            <form action={formAction} autoComplete="on" className="space-y-4">
              <input type="hidden" name="potId" value={potToAddMoney?.potId} />
              <input
                type="hidden"
                name="potName"
                value={potToAddMoney?.potName}
              />
              <PotsFormInput
                htmlFor="amountToAdd"
                label="Amount to Add"
                error={errors?.amountToAdd?.at(0)}
              >
                <p className="text-beige-500 text-preset-4">$</p>
                <input
                  type="number"
                  name="amountToAdd"
                  id="amountToAdd"
                  autoComplete="amountToAdd"
                  onChange={(e) => setAmountToAdd(+e.target.value)}
                  defaultValue={(inputs?.amountToAdd as number) ?? 5}
                  aria-label="amount to add"
                  aria-live="polite"
                  className="basic-input"
                  placeholder="e.g 2000"
                  disabled={isAddingMoney}
                  aria-disabled={isAddingMoney}
                  aria-describedby="amountToAdd-error"
                  aria-invalid={!!errors?.amountToAdd}
                  min={5}
                />
              </PotsFormInput>

              <button
                className="btn btn-primary flex w-full justify-center capitalize disabled:opacity-80"
                disabled={isAddingMoney}
              >
                {isAddingMoney ? (
                  <span className="italic">Adding Money...</span>
                ) : (
                  "Confirm Addition"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// continue from the withdraw money modal

// first make sure all the modals are working as they should before abstracting and creating custom hook

// Try to create a custom hook for the useActionState and the useEffect that display the state success message.

// Try to create a custom hook for bluring the modal

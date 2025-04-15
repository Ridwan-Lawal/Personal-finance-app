"use client";

import FormOverview from "@/app/_components/pots/FormOverview";
import PotsFormInput from "@/app/_components/pots/PotsFormInput";
import { useModalBlur } from "@/app/_hooks/useModalBlur";
import { potWithdrawalAction } from "@/app/_lib/actions/potActions";
import { getPots } from "@/app/_lib/data-service-client";
import {
  getPotsSliceReducer,
  onUpdateWithdrawMoneyModalOpening,
} from "@/app/_lib/redux/potsSlice";
import cancelIcon from "@/public/icon-close-modal.svg";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useActionState, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function WithdrawMoneyForm() {
  const [state, formAction, isWithdrawingMoney] = useActionState(
    potWithdrawalAction,
    null,
  );
  const { errors, inputs } = state ?? {};

  const { isWithdrawMoneyModalOpen, potToWithdrawMoney } =
    useSelector(getPotsSliceReducer);
  const dispatch = useDispatch();

  const { data: pots } = useQuery({
    queryKey: ["pots"],
    queryFn: () => getPots(),
  });
  const potToWithdraw = pots
    ?.filter((pot) => pot?.id === potToWithdrawMoney?.potId)
    ?.at(0);

  const [amountToWithdraw, setAmountToWithdraw] = useState(5);
  const canNotWithdraw =
    potToWithdraw?.potCurrentBalance &&
    amountToWithdraw > potToWithdraw?.potCurrentBalance;

  const onCloseModal = useCallback(
    () =>
      dispatch(
        onUpdateWithdrawMoneyModalOpening({
          modalOpen: false,
          potId: "",
          potName: "",
        }),
      ),
    [dispatch],
  );

  useModalBlur(onCloseModal, ".withdraw-money-btn", isWithdrawMoneyModalOpen);

  useEffect(() => {
    if (state) {
      if (state?.success) {
        toast.success(state?.message);
        onCloseModal();
      } else if (state?.success === false) {
        toast.error(state?.message);
      }
    }
  }, [state, onCloseModal]);

  return (
    <AnimatePresence>
      {isWithdrawMoneyModalOpen && (
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
              <h2 className="text-preset-1-2 text-grey-900 capitalize">
                withdraw <span className="lowercase">from </span>{" "}
                &lsquo;savings&rsquo;
              </h2>

              <Image
                src={cancelIcon}
                alt="cancel-icon"
                className="cursor-pointer"
                onClick={() =>
                  dispatch(
                    onUpdateWithdrawMoneyModalOpening({
                      modalOpen: false,
                      potId: "",
                      potName: "",
                    }),
                  )
                }
              />
            </div>
            <p className="text-preset-4 text-grey-500">
              Withdraw from your pot to put money back in your main balance.
              This will reduce the amount you have in this pot.
            </p>

            <FormOverview
              potTheme={{ bg: "bg-red", text: "text-red" }}
              amountToWithdraw={amountToWithdraw}
              potToAddorWithdrawMoney={potToWithdrawMoney}
            />

            {/* form */}
            <form action={formAction} autoComplete="on" className="space-y-4">
              <input
                type="hidden"
                name="potId"
                value={potToWithdrawMoney?.potId}
              />
              <input
                type="hidden"
                name="potName"
                value={potToWithdrawMoney?.potName}
              />
              <PotsFormInput
                htmlFor="amountToAdd"
                label="Amount to Withdraw"
                error={errors?.amountToWithdraw?.at(0)}
              >
                <p className="text-beige-500 text-preset-4">$</p>
                <input
                  type="number"
                  name="amountToWithdraw"
                  id="amountToWithdraw"
                  autoComplete="amountToWithdraw"
                  defaultValue={(inputs?.amountToWithdraw as number) ?? 5}
                  aria-label="amount to withdraw"
                  aria-live="polite"
                  className="basic-input"
                  placeholder="e.g 2000"
                  disabled={isWithdrawingMoney}
                  aria-disabled={isWithdrawingMoney}
                  aria-describedby="amountToWithdraw-error"
                  aria-invalid={!!errors?.amountToWithdraw?.at(0)}
                  min={1}
                  onChange={(e) => setAmountToWithdraw(+e.target.value)}
                />
              </PotsFormInput>

              {canNotWithdraw && (
                <p className="text-red text-preset-5-bold text-right">
                  Withdrawal couldn&apos;t be processed, Amount available to
                  withdrawal (Max: ${potToWithdraw?.potCurrentBalance})
                </p>
              )}

              <button
                className="btn btn-primary flex w-full justify-center capitalize disabled:cursor-not-allowed disabled:opacity-80"
                disabled={
                  isWithdrawingMoney || (canNotWithdraw as boolean | undefined)
                }
              >
                {isWithdrawingMoney ? (
                  <span className="italic">Withdrawing...</span>
                ) : (
                  "Confirm Withdrawal"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

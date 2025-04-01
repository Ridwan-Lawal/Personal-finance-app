"use client";

import BudgetFormInput from "@/app/_components/budgets/BudgetFormInput";
import PotColor from "@/app/_components/pots/PotColor";
import PotsFormInput from "@/app/_components/pots/PotsFormInput";
import { addBudgetAction } from "@/app/_lib/actions/dashboardActions";
import {
  getPotsSliceReducer,
  onUpdateEditPotModalOpening,
} from "@/app/_lib/redux/potsSlice";
import cancelIcon from "@/public/icon-close-modal.svg";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Suspense, useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function EditPotform() {
  const [state, formAction, isAddingBudget] = useActionState(
    addBudgetAction,
    null,
  );

  const { errors, inputs } = state ?? {};

  const { isEditPotModalOpen } = useSelector(getPotsSliceReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    function onBlurModal(e: Event) {
      const target = e.target as HTMLElement;
      if (!target.closest(".form-block") && !target.closest(".btn-add-pot")) {
        dispatch(onUpdateEditPotModalOpening({ modalOpen: false, potId: "" }));
      }
    }

    window.addEventListener("click", onBlurModal);

    return () => window.removeEventListener("click", onBlurModal);
  }, [dispatch]);

  useEffect(() => {
    if (state) {
      if (state?.success) {
        toast.success(state?.message);
        dispatch(onUpdateEditPotModalOpening({ modalOpen: false, potId: "" }));
      } else if (state?.success === false) {
        toast.error(state?.message);
      }
    }
  }, [state, dispatch]);

  return (
    <AnimatePresence>
      {isEditPotModalOpen && (
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
                edit pot
              </h2>

              <Image
                src={cancelIcon}
                alt="cancel-icon"
                className="cursor-pointer"
                onClick={() =>
                  dispatch(
                    onUpdateEditPotModalOpening({
                      modalOpen: false,
                      potId: "",
                    }),
                  )
                }
              />
            </div>
            <p className="text-preset-4 text-grey-500">
              If your saving targets change, feel free to update your pots.
            </p>

            {/* form */}
            <form action={formAction} autoComplete="on" className="space-y-4">
              <PotsFormInput htmlFor="potName" label="Pot Name" error="">
                <input
                  type="text"
                  name="potName"
                  id="potName"
                  defaultValue=""
                  autoComplete="pot-name"
                  aria-live="polite"
                  aria-label="pot name"
                  className="basic-input"
                />
              </PotsFormInput>
              <BudgetFormInput
                htmlFor="potTarget"
                label="Target"
                error={errors?.maxSpending?.at(0)}
              >
                <p className="text-beige-500 text-preset-4">$</p>
                <input
                  type="number"
                  name="potTarget"
                  id="potTarget"
                  autoComplete="pot-target"
                  defaultValue={(inputs?.maxSpending as number) ?? 5}
                  aria-label="pot target"
                  aria-live="polite"
                  className="basic-input"
                  placeholder="e.g 2000"
                  disabled={isAddingBudget}
                  aria-disabled={isAddingBudget}
                  aria-describedby="potTarget-error"
                  aria-invalid={!!errors?.maxSpending}
                  min={5}
                />
              </BudgetFormInput>

              <Suspense fallback={<div>Loading...</div>}>
                <PotColor inputDisable={isAddingBudget} />
              </Suspense>

              <button
                className="btn btn-primary flex w-full justify-center capitalize disabled:opacity-80"
                disabled={isAddingBudget}
              >
                {isAddingBudget ? (
                  <span className="italic">Adding Budget...</span>
                ) : (
                  "add budget"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Copy this and build the edit form modals and other modals as well

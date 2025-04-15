"use client";

import PotColor from "@/app/_components/pots/PotColor";
import PotsFormInput from "@/app/_components/pots/PotsFormInput";
import { useModalBlur } from "@/app/_hooks/useModalBlur";
import { addNewPotAction } from "@/app/_lib/actions/potActions";
import {
  getPotsSliceReducer,
  onUpdateAddPotModalOpening,
} from "@/app/_lib/redux/potsSlice";
import cancelIcon from "@/public/icon-close-modal.svg";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Suspense, useActionState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function AddNewPotForm() {
  const [state, formAction, isAddingNewPot] = useActionState(
    addNewPotAction,
    null,
  );

  const { errors, inputs } = state ?? {};

  const { isAddNewPotModalOpen } = useSelector(getPotsSliceReducer);
  const dispatch = useDispatch();

  const onCloseModal = useCallback(
    () => dispatch(onUpdateAddPotModalOpening(false)),
    [dispatch],
  );

  useModalBlur(onCloseModal, ".btn-add-pot", isAddNewPotModalOpen);

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
      {isAddNewPotModalOpen && (
        <motion.div
          className={`form fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-black/20 px-6 backdrop-blur-[2px]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeIn", duration: 0.1 }}
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
                add new pot
              </h2>

              <Image
                src={cancelIcon}
                alt="cancel-icon"
                className="cursor-pointer"
                onClick={() => dispatch(onUpdateAddPotModalOpening(false))}
              />
            </div>
            <p className="text-preset-4 text-grey-500">
              Create a pot to set savings targets. These can help keep you on
              track as you save for special purchases.
            </p>

            {/* form */}
            <form action={formAction} autoComplete="on" className="space-y-4">
              <PotsFormInput
                htmlFor="potName"
                label="Pot Name"
                error={errors?.potName?.at(0)}
              >
                <input
                  type="text"
                  name="potName"
                  id="potName"
                  defaultValue={inputs?.potName as string}
                  autoComplete="pot-name"
                  aria-describedby="potName-error"
                  aria-invalid={!!errors?.potName?.at(0)}
                  disabled={isAddingNewPot}
                  aria-disabled={isAddingNewPot}
                  aria-live="polite"
                  aria-label="pot name"
                  className="basic-input"
                  placeholder="e.g Savings"
                />
              </PotsFormInput>
              <PotsFormInput
                htmlFor="potTarget"
                label="Target"
                error={errors?.potTarget?.at(0)}
              >
                <p className="text-beige-500 text-preset-4">$</p>
                <input
                  type="number"
                  name="potTarget"
                  id="potTarget"
                  autoComplete="pot-target"
                  defaultValue={(inputs?.potTarget as number) ?? 5}
                  aria-label="pot target"
                  aria-live="polite"
                  className="basic-input"
                  placeholder="e.g 2000"
                  disabled={isAddingNewPot}
                  aria-disabled={isAddingNewPot}
                  aria-describedby="potTarget-error"
                  aria-invalid={!!errors?.potTarget?.at(0)}
                  min={5}
                />
              </PotsFormInput>

              <Suspense fallback={<div>Loading...</div>}>
                <PotColor inputDisable={isAddingNewPot} />
              </Suspense>

              <button
                className="btn btn-primary flex w-full justify-center capitalize disabled:opacity-80"
                disabled={isAddingNewPot}
                aria-disabled={isAddingNewPot}
              >
                {isAddingNewPot ? (
                  <span className="italic">Adding pot...</span>
                ) : (
                  "add pot"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

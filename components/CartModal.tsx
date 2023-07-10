"use client";
import { ModalInterface } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import CartProductCard from "./CartProductCard";
import { useSelector } from "react-redux";
import { selectCarts } from "@/redux/features/cartSlices";
const CartModal = ({ isOpen, closeModal }: ModalInterface) => {
  let carts = useSelector(selectCarts);
  const [subtotal, setSubtoal] = useState(0);

  useEffect(() => {
    let calculate = () => {
      let sum = 0;
      if (carts.length > 0) {
        carts.map((item) => (sum += item.price * item.quantity));
      }
      setSubtoal(sum);
    };
    calculate();
  }, [carts]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-end text-center w-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-out duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg h-screen overflow-y-auto transform bg-white p-8 text-left shadow-xl transition-all flex flex-col gap-5">
                  <div className="relative w-full h-full">
                    <div className="relative mb-2">
                      <h2>Shopping Cart</h2>
                      <button
                        type="button"
                        className="absolute top-0 right-0 z-10 w-fit text-2xl p-2 text-whites rounded-full"
                        onClick={closeModal}
                      >
                        <RxCross2 />
                      </button>
                    </div>

                    <div className="mt-4">
                      {carts &&
                        carts.map((item) => (
                          <CartProductCard key={item._id} item={item} />
                        ))}
                    </div>

                    <div className="absolute bottom-0 max-w-lg w-full">
                      <div className="relative w-full">
                        <div className="relative flex justify-between">
                          <h2 className="text-grey">Subtotal:</h2>
                          <h2 className="font-bold">${subtotal}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CartModal;

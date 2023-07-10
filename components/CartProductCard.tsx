"use client";
import React, { useState } from "react";
import { DjiPanthom } from "@/public/images";
import Image from "next/image";
import { CartInterface } from "@/types";
import { HiPlus, HiMinus } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  removeFromCarts,
  updateProductQuantity,
} from "@/redux/features/cartSlices";
const CartProductCard = ({ item }: { item: CartInterface }) => {
  // useSelector();
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(item.quantity);

  const qtyIncrement = async (quantity: number) => {
    if (quantity >= 1) {
      try {
        let updateItem = {
          id: item._id,
          quantity: quantity + 1,
        };
        await dispatch(updateProductQuantity(updateItem));
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  };

  const qtyDecrement = async (quantity: number) => {
    if (quantity > 1) {
      try {
        let updateItem = {
          id: item._id,
          quantity: quantity - 1,
        };
        await dispatch(updateProductQuantity(updateItem));
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  };

  const removeItem = async () => {
    try {
      await dispatch(removeFromCarts(item._id));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="relative flex justify-between border-b-2 pb-5 border-dashed">
      <div className="flex flex-1 gap-2">
        <div className="w-[80px] h-[80px]">
          <Image
            src={DjiPanthom}
            className="object-cover w-full h-full"
            alt="product image"
          />
        </div>
        <div className="relative h-full w-full">
          <h4>{item.title}</h4>
          <div className="flex gap-5">
            {/* <div className="relative">
              <div className="bg-primary text-white px-2 rounded-sm max-w-auto h-full flex justify-around gap-3 place-items-center items-center">
                <button
                  className="border-none p-0 shadow-none font-bold"
                  onClick={qtyDecrement}
                >
                  <HiMinus />
                </button>
                <span>{quantity}</span>
                <button
                  className="border-none p-0 shadow-none font-bold"
                  onClick={qtyIncrement}
                >
                  <HiPlus />
                </button>
              </div>
            </div> */}
            <div className="relative flex place-items-center">
              <button
                className="font-bold text-primary text-2xl"
                onClick={() => qtyIncrement(item.quantity)}
              >
                <HiPlus />
              </button>
              <button
                type="button"
                className="text-2xl text-yellow-700"
                onClick={() => qtyDecrement(item.quantity)}
              >
                <HiMinus />
              </button>
              <button type="button" onClick={removeItem}>
                <MdDelete className="text-xl text-red-600" />
              </button>
            </div>
          </div>
          <span className="absolute bottom-0">Qty: {item.quantity}</span>
        </div>
      </div>
      <div className="realative">
        <h3 className="text-grey">${item.price * item.quantity}</h3>
      </div>
    </div>
  );
};

export default CartProductCard;

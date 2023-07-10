"use client";
import Image from "next/image";
import React, { useState } from "react";
import { DjiPanthom } from "@/public/images";
import { HiPlus, HiMinus } from "react-icons/hi";
import { CartInterface, ProuductInterface } from "@/types";
import { useDispatch } from "react-redux";
import { Trykker } from "next/font/google";
import { addToCarts } from "@/redux/features/cartSlices";
import { AppDispatch } from "@/redux/store";
const ProductCard = ({ item }: { item: ProuductInterface }) => {
  const [quantity, setQuantity] = useState(1);

  let dispatch = useDispatch<AppDispatch>();

  const qtyIncrement = () => {
    if (quantity >= 1) {
      setQuantity((prev) => prev + 1);
    }
  };

  const qtyDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const toCart = async () => {
    let product: CartInterface = {
      userId: localStorage.getItem("user"),
      productId: item._id,
      title: item.title,
      price: item.price,
      discount: item.discount,
      quantity: 1,
    };
    try {
      await dispatch(addToCarts(product));
      console.log("added");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="relative p-4 border-[1px] border-grey">
      <div className="relative justify-center place-items-center mx-auto">
        <Image src={DjiPanthom} alt="product image" />
      </div>
      <div className="">
        <h5>{item.title}</h5>
        <div className="flex gap-3 py-2">
          <h4 className="font-semibold">${item.price}</h4>
          {/* <span className=" line-through text-sm mt-1">$560</span> */}
        </div>
        <div className="relative">
          <button
            className=" group relative border-[1px] max-w-[108px] max-h-[32px] px-3 py-1 rounded-sm text-[14px] "
            type="button"
            onClick={toCart}
          >
            Add to cart
            {/* <div className="hidden group-hover:block">
              <div className="absolute rounded-sm w-full h-full top-0 left-0 flex justify-around place-items-center items-center bg-primary text-white">
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

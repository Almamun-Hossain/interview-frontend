import Link from "next/link";
import React, { useState } from "react";
import { ImCart } from "react-icons/im";
import CartModal from "./CartModal";
import { useSelector } from "react-redux";
import { selectCarts } from "@/redux/features/cartSlices";
const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  let carts = useSelector(selectCarts);

  return (
    <div className="flex justify-between py-[40px]">
      <div className="relative text-primary flex gap-3">
        <div className="h-[40px] w-[40px] bg-primary rounded-full p-2">
          <div className="bg-white w-full h-full rounded-full"></div>
        </div>
        <Link href="/" className="cursor-pointer">
          <h2 className=" font-bold">E-Bazar</h2>
        </Link>
      </div>
      <div className="p-2">
        <button
          type="button"
          className="flex place-items-center justify-center gap-1 border-[1px] border-grey rounded-lg px-2 py-1"
          onClick={() => setShowModal(true)}
        >
          <ImCart className="text-primary" />
          <span>Cart({carts.length})</span>
        </button>
      </div>
      <CartModal isOpen={showModal} closeModal={() => setShowModal(false)} />
    </div>
  );
};

export default Navbar;

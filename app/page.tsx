"use client";
import AddProductModal from "@/components/AddProductModal";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { HeadList } from "@/constants";
import HeadCard from "@/components/HeadCard";
import { uuid } from "uuidv4";
import { getAllProducts } from "@/services/ClientDataFetching";
import { ProuductInterface } from "@/types";
import { selectProducts } from "@/redux/features/productSlices";
import { useSelector } from "react-redux";
export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const products = useSelector(selectProducts);

  return (
    <div className="container mx-auto">
      <Navbar />

      <div className="relative my-8">
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-5">
          {HeadList &&
            HeadList.map(({ id, title, description, icon }) => (
              <HeadCard
                key={id}
                title={title}
                description={description}
                icon={icon}
              />
            ))}
        </div>
      </div>

      <div className="relative mb-8">
        <div className="relative flex justify-between align-middle place-items-center py-8">
          <span className="text-[24px]">Availabe Product</span>
          <button
            className="flex place-items-center text-[14px] border-[1px] border-primary text-primary px-10 py-1 rounded-sm"
            onClick={() => setShowModal(true)}
          >
            <PiPlusCircle className="text-[16px] mr-1" /> Add Product
          </button>
        </div>
        {showModal && (
          <AddProductModal
            isOpen={showModal}
            closeModal={() => setShowModal(false)}
          />
        )}

        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-4">
          {products &&
            products.map((item: ProuductInterface) => (
              <ProductCard key={item._id} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
}

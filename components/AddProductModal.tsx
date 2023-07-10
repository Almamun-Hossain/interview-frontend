"use client";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import React, { useState } from "react";
import { ModalInterface, ProuductInterface } from "@/types";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addProduct, selectSuccess } from "@/redux/features/productSlices";
import { AppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";

const AddProductModal = ({ isOpen, closeModal }: ModalInterface) => {
  const [product, setProduct] = useState({
    title: "",
    slug: "",
    price: "",
    discount: "",
    discountStartDate: "",
    discountEndDate: "",
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const success = useSelector(selectSuccess);

  const generateSlug = () => {
    if (product.title) {
      let slug = product.title.toLocaleLowerCase().replace(/ /g, "-");
      setProduct({ ...product, slug: slug });
    } else {
      alert("product title is null");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let productData = {
      ...product,
      price: Number(product.price),
      discount: product.price ? Number(product.price) : 0,
    };

    try {
      setIsSubmit(true);
      await dispatch(addProduct(productData));

      if (success) {
        setProduct({
          title: "",
          slug: "",
          price: "",
          discount: "",
          discountStartDate: "",
          discountEndDate: "",
        });
        setIsSubmit(false);

        alert("Product added successfully!!");
      } else {
        alert("Something wrongs :(");
        setIsSubmit(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-out duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-md bg-white p-8 text-left shadow-xl transition-all flex flex-col gap-5">
                <div className="relative mb-2">
                  <h2>Add New Product</h2>
                  <span className="font-thin">
                    Add description of your new product
                  </span>
                  <button
                    type="button"
                    className="absolute top-0 right-0 z-10 w-fit text-2xl p-2 text-whites rounded-full"
                    onClick={closeModal}
                  >
                    <RxCross2 />
                  </button>
                </div>

                <div className="">
                  <form onSubmit={onFormSubmit}>
                    <div className="relative block mb-2">
                      <label className="pb-2">Product Name</label>
                      <input
                        type="text"
                        name="title"
                        className="mt-1 w-full border-[1px] border-gray rounded-lg p-2 focus:ring-0 focus:border-grey focus:outline-none"
                        placeholder="Product name"
                        value={product.title}
                        onChange={(e) => handleInput(e)}
                        required
                      />
                    </div>
                    <div className="relative block mb-2">
                      <label className="pb-2">Slug</label>
                      <input
                        type="text"
                        name="slug"
                        className="mt-1 w-full border-[1px] border-gray rounded-lg p-2 focus:ring-0 focus:border-grey focus:outline-none"
                        placeholder="product-name"
                        value={product.slug}
                        onChange={(e) => handleInput(e)}
                        required
                      />
                      <div className="absolute top-7 right-0">
                        <button
                          type="button"
                          className="bg-primary text-white px-4 py-2 rounded-lg"
                          onClick={generateSlug}
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                    <div className="relative block mb-2">
                      <label className="pb-2">Price</label>
                      <input
                        type="number"
                        name="price"
                        className=" appearance-none mt-1 w-full border-[1px] border-gray rounded-lg p-2 focus:ring-0 focus:border-grey focus:outline-none"
                        placeholder="80"
                        min={1}
                        value={product.price}
                        onChange={(e) => handleInput(e)}
                        required
                      />
                    </div>
                    <div className="relative block mb-2">
                      <label className="pb-2">Discount(%)</label>
                      <input
                        type="number"
                        name="discount"
                        className=" appearance-none mt-1 w-full border-[1px] border-gray rounded-lg p-2 focus:ring-0 focus:border-grey focus:outline-none"
                        placeholder="10"
                        min={0}
                        value={product.discount}
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
                    <div className="relative block mb-2">
                      <label className="pb-2">Discount Start</label>
                      <input
                        type="date"
                        name="discountStartDate"
                        className=" appearance-none mt-1 w-full border-[1px] border-gray rounded-lg p-2 focus:ring-0 focus:border-grey focus:outline-none"
                        placeholder="09-14-2023"
                        value={product.discountStartDate}
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
                    <div className="relative block mb-2">
                      <label className="pb-2">Discount End</label>
                      <input
                        type="date"
                        name="discountEndDate"
                        className=" appearance-none mt-1 w-full border-[1px] border-gray rounded-lg p-2 focus:ring-0 focus:border-grey focus:outline-none"
                        placeholder="80"
                        value={product.discountEndDate}
                        onChange={(e) => handleInput(e)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-primary text-white rounded-lg py-3 disabled:bg-grey"
                      disabled={isSubmit}
                    >
                      Add
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddProductModal;

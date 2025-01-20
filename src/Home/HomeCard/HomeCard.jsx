import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaEye } from 'react-icons/fa6';
import { CgAddR } from 'react-icons/cg';
import { Dialog, DialogPanel } from '@headlessui/react';

import useAxiosPublic from '../../CustomHook/useAxiosPublic';
import Header from '../../CommonComponent/Header';
import useAuth from '../../CustomHook/useAuth';

const HomeCard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [details, setDetails] = useState([]);

    const { category } = useParams();
    const axiosPublic = useAxiosPublic();
    const [data, setData] = useState([]);
    const { user } = useAuth();

    const fetchData = async () => {
        const catInfo = await axiosPublic.get(`/medicinesAll`);
        if (catInfo.data) {
            setData(catInfo.data.perPageData);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDetails = async (id) => {
        const res = await axiosPublic.get(`/medicines-details/${id}`);
        if (res.data) {
            setDetails(res.data);
        }
        openModal();
    };

    const handleCart = async (userInfo) => {
        if (!user.email) return alert('login first');
        const medicineInfo = {
            medicineId: userInfo._id,
            sellerEmail: userInfo.sellerEmail,
            userEmail: user.email,
            quentity: 1,
            category: userInfo.category,
            GenericName: userInfo.GenericName,
            photo: userInfo.photo,
            Price: userInfo.Price,
            ItemName: userInfo.ItemName,
        };

        const res = await axiosPublic.post(`/cart`, medicineInfo);

        if (res.data.insertedId) {
            alert('cart added successfully');
        } else {
            alert(res.data.error);
        }
    };

    return (
        <div className="h-full">
            <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                <div
                    className="fixed inset-0 bg-black bg-opacity-25"
                    aria-hidden="true"
                />
                <DialogPanel className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
                    <div className="w-full max-w-xl rounded bg-white p-6 shadow-lg">
                        <img
                            className="w-[300px] h-[300px] object-cover"
                            src={details.photo}
                            alt=""
                        />
                        <p className="mt-2 text-xl text-gray-600">
                            {details.GenericName}
                        </p>
                        <p className="mt-2 text-xl text-gray-600">
                            {details.ItemName}
                        </p>

                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleCart(details)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>

            <Header
                title="Products"
                subTitle=" Our Latest Products"
                details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus lobortis faucibus. Pellentesque vehicula lacinia arcu nec sodales."
            ></Header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.map((item) => (
                    <motion.div
                        key={item._id}
                        className="flex relative flex-col h-full rounded-sm border-[1px] p-4"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                    >
                        {item.discountPercentage > 0 && (
                            <p className="w-8 text-sm font-semibold absolute top-1 right-1 h-8 flex items-center justify-center p-6 bg-first opacity-90 text-white rounded-full z-20">
                                -{item.discountPercentage}%
                            </p>
                        )}
                        <motion.div
                            className="flex-grow"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="md:h-[200px]">
                                <img
                                    className="h-full rounded-sm w-full object-cover"
                                    src={item.photo}
                                    alt=""
                                />
                            </div>
                            <div className="text-center">
                                <div className="rating pt-2 rating-sm">
                                    <input
                                        type="radio"
                                        name="rating-4"
                                        className="mask mask-star-2 bg-first"
                                    />
                                    <input
                                        type="radio"
                                        name="rating-4"
                                        className="mask mask-star-2 bg-first"
                                        defaultChecked
                                    />
                                    <input
                                        type="radio"
                                        name="rating-4"
                                        className="mask mask-star-2 bg-first"
                                    />
                                    <input
                                        type="radio"
                                        name="rating-4"
                                        className="mask mask-star-2 bg-first"
                                    />
                                    <input
                                        type="radio"
                                        name="rating-4"
                                        className="mask mask-star-2 bg-first"
                                    />
                                </div>
                                <h2 className="font-semibold text-second text-xl py-1">
                                    {item.ItemName} {item.Massunit} mg
                                </h2>
                                <div className="flex gap-6 justify-center items-center py-1">
                                    <h3 className="text-thrid line-through font-mono italic">
                                        MRP.{item.Price}tk
                                    </h3>
                                    <h3 className="font-bold text-md italic text-first">
                                        MRP.{' '}
                                        {Math.floor(
                                            item.Price -
                                                (item.Price *
                                                    item.discountPercentage) /
                                                    100
                                        )}{' '}
                                        tk
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                        <div className="flex flex-col justify-center gap-3 mt-1 items-center">
                            <button
                                onClick={() => handleCart(item)}
                                className="uppercase flex items-center text-sm gap-2 font-semibold bg-first text-white px-4 py-[7px]"
                            >
                                <CgAddR size={18}></CgAddR>{' '}
                                <span>add to cart</span>
                            </button>

                            <button
                                className="flex font-semibold text-thrid items-center gap-2 uppercase text-xs"
                                onClick={() => handleDetails(item._id)}
                            >
                                <FaEye size={14}></FaEye>
                                <span>quick view</span>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="my-12 flex justify-center">
                <Link
                    to="/shop"
                    className="py-3 px-6 rounded-sm flex items-center w-40 font-semibold justify-center gap-4 bg-first text-white"
                >
                    <span>See More</span>
                    <FaArrowRight></FaArrowRight>
                </Link>
            </div>
        </div>
    );
};

export default HomeCard;

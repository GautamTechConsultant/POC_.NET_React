import React from "react";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AxiosBase } from "../api";
import Swal from "sweetalert2";
export default function MovieModal({ open, setOpen, item, getMovies }) {
  const { id } = item;
  const [user, setUser] = useState({ title: "", actor: "", rating: 0 });

  console.log(user);
  const handleEdit = async () => {
    try {
      const res = AxiosBase.put(`/api/Movies/`, { ...user, id }).then((res) => {
        Swal.fire({
          title: "Success",
          text: "Edites successfully",
          icon: "success",
        });

        getMovies();
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="">
                    <form className="max-w-sm mx-auto mt-11">
                      <div className="mb-5">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Movie Name
                        </label>
                        <input
                          type="email"
                          id="email"
                          onChange={(e) =>
                            setUser({ ...user, title: e.target.value })
                          }
                          defaultValue={item.name || ""}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          placeholder="name@flowbite.com"
                          required=""
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Actor Name
                        </label>
                        <input
                          id="password"
                          onChange={(e) =>
                            setUser({ ...user, actor: e.target.value })
                          }
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          required=""
                          defaultValue={item.job || ""}
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          htmlFor="repeat-password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Rating
                        </label>
                        <input
                          onChange={(e) =>
                            setUser({ ...user, rating: e.target.value })
                          }
                          id="repeat-password"
                          defaultValue={item.date || ""}
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          required=""
                        />
                      </div>
                      <div className="flex items-start mb-5">
                        <div className="flex items-center h-5"></div>
                      </div>
                    </form>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => handleEdit()}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

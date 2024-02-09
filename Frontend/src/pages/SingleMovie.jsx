import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosBase } from "../api";

const SingleMovie = () => {
  const { id } = useParams();
  const [actors, setActors] = useState();
  const getActor = async () => {
    try {
      const res = await AxiosBase.get(`/api/Movies/searchByMovie?name=${id}`);
      console.log(res?.data[0]?.actor, "response");
      setActors(res?.data[0]?.actor);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getActor();
  }, []);

  return (
    <>
      <div className="py-8  px-8 my-40 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <img
          className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
          src="https://www.svgrepo.com/show/170303/avatar.svg"
          alt="Woman's Face"
        />
        <div className="text-center space-y-2 sm:text-left">
          <div className="space-y-0.5">
            <p className="text-lg text-black font-semibold"> {actors}</p>
            <p className="text-slate-500 font-medium">Actor</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMovie;

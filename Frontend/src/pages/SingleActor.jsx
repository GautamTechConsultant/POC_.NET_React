import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { AxiosBase } from "../api";

const SingleActor = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    try {
      const res = await AxiosBase.get(`/api/Movies/searchByActor?name=${id}`);
      setMovie(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovie();
  }, []);
  {
    /* <p>{item.title}</p */
  }
  return (
    <>
      <div className="flex mx-auto gap-4 justify-center">
        {movie?.map((item) => {
          return (
            <>
              <div className="py-8  px-8 my-40  gap-6 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                <img
                  className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
                  src="https://www.svgrepo.com/show/170303/avatar.svg"
                  alt="Woman's Face"
                />
                <div className="text-center space-y-2 sm:text-left">
                  <div className="space-y-0.5">
                    <p className="text-lg text-black font-semibold">
                      {" "}
                      {item.title}
                    </p>
                    <p className="text-slate-500 font-medium">Movie</p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default SingleActor;

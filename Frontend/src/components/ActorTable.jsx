import { Card, Typography } from "@material-tailwind/react";

import ActorModal from "./ActorModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { AxiosBase } from "../api";
import AddActorModal from "./AddActor";
import AddMovieModal from "./AddActor";

const TABLE_HEAD = ["Name", "Job", "Employed", "Action"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

export function ActorTable() {
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});
  const [openAdd, setOpenAdd] = useState(false);

  const handleDelete = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Delete!",
      text: "Do you want to continue",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosBase.delete(`api/Movie/${id}`)
          .then(() => {
            Swal.fire({
              title: "Success",
              text: "Deleted successfully",
              icon: "success",
            });
            
          })
          .catch((error) => {
            console.error("Error deleting:", error);
            Swal.fire({
              title: "Error",
              text: "Something went wrong",
              icon: "error",
            });
          });
      }
    });
  };
  async function getActors() {
    try {
      const res = await AxiosBase.get("");
      console.log(res.data);
      setMovies(res.data);
    } catch (error) {
      console.log("err", error);
    }
  }
  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-center text-blue-gray-900 text-3xl my-4">
          Actor Table
        </h1>

        <div className="ml-auto">
          <PlusCircle
            onClick={() => {
              setOpenAdd(true);
            }}
          />
        </div>
      </div>

      <Card className=" w-full ">
        <table className="w-full min-w-max table-auto text-left h-full">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((item, index) => {
              const { name, job, date } = item;
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <Link to={`/actor/${name}`}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                  </Link>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {job}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      <div className="flex justify-center items-center gap-2">
                        <Pencil
                          onClick={() => {
                            setOpenModal(true);
                            setItem(item);
                          }}
                          strokeWidth={1}
                        />
                        <Trash2
                          onClick={() => handleDelete(name)}
                          strokeWidth={1}
                        />
                      </div>
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <ActorModal open={openModal} item={item} setOpen={setOpenModal} />
      <AddMovieModal open={openAdd} setOpen={setOpenAdd} />
    </>
  );
}

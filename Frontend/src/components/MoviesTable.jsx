import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { AxiosBase } from "../api";
import MovieModal from "./MovieModal";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import AddMovieModal from "./AddActor";
const TABLE_HEAD = ["Title", "Rating", "Actor Name", "Action"];

export function MoviesTable() {
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});
  const [movies, setMovies] = useState([]);
  const [addMovie, setaddMoie] = useState(false);

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
        AxiosBase.delete(`api/Movies/${id}`)
          .then(() => {
            Swal.fire({
              title: "Success",
              text: "Deleted successfully",
              icon: "success",
            });
            getMovies();
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

  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies() {
    console.log("called");
    try {
      const res = await AxiosBase.get("/api/Movies");
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
          Movie Table
        </h1>

        <div className="ml-auto">
          <PlusCircle
            onClick={() => {
              setaddMoie(true);
            }}
          />
        </div>
      </div>
      <Card className="w-full">
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
                    className="flex justify-center items-center font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {movies.map((list, index) => {
              const { title, actor, rating, id } = list;
              const isLast = index === movies.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex justify-center items-center font-normal"
                    >
                      <Link to={`/movie/${title}`}>
                        <span>{title}</span>
                      </Link>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray bg-rad-700"
                      className="rating-bg	 flex justify-center items-center font-normal"
                    >
                      {rating}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex justify-center items-center font-normal"
                    >
                      <Link to={`/actor/${actor}`}>{actor}</Link>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="flex justify-center items-center font-medium"
                    >
                      <div className="flex justify-center items-center gap-2">
                        <Pencil
                          className="bg-[#6e2abc] text-white w-10 h-10 rounded-lg p-2"
                          onClick={() => {
                            setOpenModal(true);
                            setItem(list);
                          }}
                          strokeWidth={1}
                        />
                        <Trash2
                          className="bg-[#ff0000] text-white w-10 h-10 rounded-lg p-2"
                          onClick={() => {
                            handleDelete(id);
                          }}
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
      <MovieModal
        open={openModal}
        item={item}
        setOpen={setOpenModal}
        getMovies={getMovies}
      />
      <AddMovieModal
        open={addMovie}
        getMovies={getMovies}
        setOpen={setaddMoie}
      />
    </>
  );
}

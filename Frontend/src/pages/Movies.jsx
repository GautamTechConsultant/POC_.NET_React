import React from "react";
import { NavbarDefault } from "../components/Navbar";
import { MoviesTable } from "../components/MoviesTable";

export default function Movies() {
  return (
    <>
      <div>
        <NavbarDefault />
        <div className="px-4 py-2 lg:px-8 lg:py-4 mx-auto">
          <MoviesTable />
        </div>
      </div>
    </>
  );
}

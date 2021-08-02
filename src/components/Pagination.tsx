import React from "react";

import _ from "lodash";

export const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  minPageNumberLimit,
  maxPageNumberLimit,
  handlePrevbtn,
  handleNextbtn,
  currentPage,
}: {
  postsPerPage: number;
  totalPosts: number;
  paginate: Function;
  minPageNumberLimit: number;
  maxPageNumberLimit: number;
  handlePrevbtn: Function;
  handleNextbtn: Function;
  currentPage: any;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-row m-auto w-1/6">
      {pageNumbers.map((number) => {
        if (_.inRange(number, currentPage - 3, currentPage + 3)) {
          return (
            <button
              key={number}
              className="text-white rounded-full bg-red inline-block mx-auto px-4 hover:bg-red-800 "
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};
export default Pagination;
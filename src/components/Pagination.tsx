import React from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/solid";

export const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: {
  postsPerPage: number;
  totalPosts: number;
  paginate: Function;
  currentPage: any;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-row m-auto w-1/6 mb-2">
      <button
        className="text-white rounded-sm bg-red inline-block mx-auto px-4 hover:bg-red-800 "
        onClick={() => {
          paginate(1);
        }}
      >
        <ChevronDoubleLeftIcon className="h-6 w-6" />
      </button>
      <button
        className="text-white rounded-sm bg-red inline-block mx-auto px-4 hover:bg-red-800 "
        onClick={() => {
          if (currentPage !== 1) {
            paginate(currentPage - 1);
          }
        }}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        className="text-white rounded-sm bg-red inline-block mx-auto px-4 hover:bg-red-800 "
        onClick={() => {
          if (currentPage !== pageNumbers.length) paginate(currentPage + 1);
        }}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
      <button
        className="text-white rounded-sm bg-red inline-block mx-auto px-4 hover:bg-red-800 "
        onClick={() => {
          paginate(pageNumbers.length);
        }}
      >
        <ChevronDoubleRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
};
export default Pagination;

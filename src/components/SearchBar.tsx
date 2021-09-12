import { SearchIcon } from "@heroicons/react/outline";
type searchBar = {
  filter: any;
  value: string;
};

export const SearchBar = (props: searchBar) => {
  return (
    <span className="relative text-gray-400 focus-within:text-gray-600 block">
      <SearchIcon className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3 text-white" />
      <input
        type="search"
        value={props.value}
        onChange={props.filter}
        className="border-2 p-2 rounded-md w-full dark pl-14 font-bold"
        placeholder="Search team"
      />
    </span>
  );
};

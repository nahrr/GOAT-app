import * as React from "react";
import { ArenaRankings } from "./ArenaRankings";
import axios from "axios";
import Pagination from "./Pagination";
import Button from "./Button";
import Loader from "./Loading";
export interface IPost {
  id: number;
  name: string;
  realm: string;
  region: string;
  season: string;
  bracket: string;
  season_match_statistics: {
    played: number;
    won: number;
    lost: number;
  };
  faction: {
    type: string;
  };
  rating: number;
  rank: number;
  team: {
    name: string;
    realm: {
      slug: string;
    };
    members: [
      {
        character: {
          playable_class: {
            key: {
              href: string;
            };
            id: number;
          };
        };
        rating: number;
      }
    ];
  };
}

const defaultPosts: IPost[] = [];

export const ArenaRankingsFetcher = () => {
  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] =
    React.useState(defaultPosts);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] =
    React.useState("");

  const [currentPage, setCurrentPage]: [number, (currentPage: number) => any] =
    React.useState(1);

  const [postsPerPage]: [number, (postsPerPage: number) => any] =
    React.useState(10);

  const [pageNumberLimit] = React.useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit]: [
    number,
    (currentPage: number) => any
  ] = React.useState(5);
  const [minPageNumberLimit, setminPageNumberLimit]: [
    number,
    (currentPage: number) => any
  ] = React.useState(0);

  const [onLoadBtn, setOnLoadBtn]: [boolean, (onLoadBtn: boolean) => void] =
    React.useState<boolean>(true);

  const [onClickBtn, setOnClickBtn]: [string, (onClickBtn: string) => void] =
    React.useState("");

  const defaultURL = "http://localhost:7071/api/ranks/";
  const [bracket, setBracket]: [string, (bracket: string) => void] =
    React.useState("");

  if (bracket === "") {
    setBracket("2v2");
  }

  React.useEffect(() => {
    axios
      .get(defaultURL + bracket, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 1000000,
      })
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((ex) => {
        let error = axios.isCancel(ex)
          ? "Request Cancelled"
          : ex.code === "ECONNABORTED"
            ? "A timeout has occurred"
            : ex.response.status === 404
              ? "Resource Not Found"
              : "An unexpected error has occurred";

        setError(error);
        setLoading(false);
      });
  }, [bracket]);

  // Get current posts
  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentPosts: IPost[] = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Change page to
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  // set style on page page load
  let onLoadStyle = "text-white bg-green-500"
  let onClickStyle2v2 = ""
  let onClickStyle3v3 = ""
  let onClickStyle5v5 = ""
  if (onLoadBtn === false) {
    onLoadStyle = ""
  }
  switch (onClickBtn) {
    case "2v2": onClickStyle2v2 = "text-white bg-green-500 "
      break;
    case "3v3": onClickStyle3v3 = "text-white bg-green-500 "
      break;
    case "5v5": onClickStyle5v5 = "text-white bg-green-500 "
      break;
  }


  return (
    <>
      <div className="mx-auto mt-12 w-2/3">
        <Button
          onClick={() => {
            setBracket("2v2");
            setLoading(true);
            setOnLoadBtn(false)
            setOnClickBtn("2v2");
          }}
          children="2v2"
          onLoadStyle={onLoadStyle}
          onClickStyle2v2={onClickStyle2v2}

        />
        <Button
          onClick={() => {
            setBracket("3v3");
            setLoading(true);
            setOnLoadBtn(false)
            setOnClickBtn("3v3");
          }}
          children="3v3"
          onClickStyle3v3={onClickStyle3v3}
        />
        <Button
          onClick={() => {
            setBracket("5v5");
            setLoading(true);
            setOnLoadBtn(false)
            setOnClickBtn("5v5");
          }}
          children="5v5"
          onClickStyle5v5={onClickStyle5v5}
        />
        {loading && (
          <div className="flex flex-col items-center mt-2">
            <Loader />
          </div>
        )}
      </div>
      <ArenaRankings posts={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        minPageNumberLimit={minPageNumberLimit}
        maxPageNumberLimit={maxPageNumberLimit}
        currentPage={currentPage}
        handlePrevbtn={handlePrevbtn}
        handleNextbtn={handleNextbtn}
      />
      {error && (
        <div className="flex flex-col items-center mt-2">
          <p className="error">{error}</p>
        </div>
      )}
    </>
  );
};

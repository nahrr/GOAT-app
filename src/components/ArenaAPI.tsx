import * as React from "react";
import { ArenaRankings } from "./ArenaRankings";
import axios from "axios";
import Pagination from "./Pagination";

export interface IPost {
  id: number;
  name: string;
  realm: string;
  region: string;
  season: string;
  bracket: string;
  faction: {
    type: string;
  }
  rating: number;
  rank: number;
  team: {
    name: string,
    realm: {
      slug: string;
    },
    members:[{
      character: {
      playable_class: {
        key: {
          href: string
        },
        id: number;
      }
    }
      rating: number;
    }
  ] 
}
}

const defaultPosts: IPost[] = [];

export const ArenaRankingsFetcher = () => {

  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] =
    React.useState(defaultPosts);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] =
    React.useState("");

  const [currentPage, setCurrentPage]: [number, (currentPage: number) => any]
    = React.useState(1);
  const [postsPerPage]: [number, (postsPerPage: number) => any]
    = React.useState(10);

  const [pageNumberLimit, setpageNumberLimit] = React.useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit]: [number, (currentPage: number) => any] = React.useState(5);
  const [minPageNumberLimit, setminPageNumberLimit]: [number, (currentPage: number) => any] = React.useState(0);


  const url2 = "http://localhost:7071/api/ranks";

  React.useEffect(() => {

    axios
      .get(url2, {
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
  }, []);

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
    alert("ett")
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <>
      {loading && <h2 className="text-white mx-auto"> laddar som fan</h2>}

      <ArenaRankings posts={currentPosts} />
      <Pagination postsPerPage={postsPerPage}
        totalPosts={posts.length} paginate={paginate}
        minPageNumberLimit={minPageNumberLimit} maxPageNumberLimit={maxPageNumberLimit}
        currentPage={currentPage}
        handlePrevbtn={handlePrevbtn}
        handleNextbtn={handleNextbtn} />
      {error && <p className="error">{error}</p>}
    </>
  );
};
import * as React from "react";
import { ArenaRankings } from "./ArenaRankings";
import axios from "axios";
import Pagination from "./Pagination";
import Button from "./Button";
import Loader from "./Loading";
import { ArenaPosts } from "../Interface/IPost";
import { useState } from "react";
import { activeStyle } from "./Button";

export type ActiveButton = {
  twos: boolean;
  threes: boolean;
  fives: boolean;
  seasonOne: boolean;
  seasonTwo: boolean;
};

const defaultPosts: ArenaPosts[] = [];

export const ArenaRankingsFetcher = () => {
  const [posts, setPosts]: [ArenaPosts[], (posts: ArenaPosts[]) => void] =
    useState(defaultPosts);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [postsPerPage] = useState<number>(10);

  const [buttonStyle, setButtonStyle] = useState<ActiveButton>({
    twos: true,
    threes: false,
    fives: false,
    seasonOne: true,
    seasonTwo: false,
  });
  const [bracket, setBracket]: [string, (bracket: string) => void] =
    React.useState("2v2");
  const [season, setSeason] = useState<string>("1");

  const prodURL = "https://arenarankingsapigoat.azurewebsites.net/api/ranks/";
  const devURL = "http://localhost:7071/api/ranks/"

  React.useEffect(() => {
    axios
      .get(prodURL + bracket + "/" + season)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
        setError("");
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
  const currentPosts: ArenaPosts[] = posts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  // Change page to
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <React.Fragment>
      <div className="flex flex-row items-center justify-between mx-auto w-2/3 mt-6"> 
      <div className="">
        <Button
          onClick={() => {
            setBracket("2v2");
            setLoading(true);
            setButtonStyle({
              ...buttonStyle,
              twos: true,
              threes: false,
              fives: false,
            });
            setCurrentPage(1);
          }}
          children="2v2"
          buttonStyle={buttonStyle.twos ? activeStyle : null}
        />
        <Button
          onClick={() => {
            setBracket("3v3");
            setLoading(true);
            setButtonStyle({
              ...buttonStyle,
              twos: false,
              threes: true,
              fives: false,
            });
            setCurrentPage(1);
          }}
          children="3v3"
          buttonStyle={buttonStyle.threes ? activeStyle : null}
        />
        <Button
          onClick={() => {
            setBracket("5v5");
            setLoading(true);
            setButtonStyle({
              ...buttonStyle,
              twos: false,
              threes: false,
              fives: true,
            });
            setCurrentPage(1);
          }}
          children="5v5"
          buttonStyle={buttonStyle.fives ? activeStyle : null}
        />
        </div>
        <div className="">
          <Button
            onClick={() => {
              // setLoading(true);
              // setSeason("1");
              setButtonStyle({
                ...buttonStyle,
                seasonOne: true,
                seasonTwo: false,
              });
            }}
            children="S1"
            buttonStyle={buttonStyle.seasonOne ? activeStyle : null}
          />
          <Button
            onClick={() => {
              // setLoading(true);
              // setSeason("2");
              setButtonStyle({
                ...buttonStyle,
                seasonOne: false,
                seasonTwo: true,
              });
            }}
            children="S2"
            buttonStyle={buttonStyle.seasonTwo ? activeStyle : null}
          />
       </div>
      
      </div>
      <div className="mx-auto w-2/3"></div>
      {loading && <Loader />}
      {!loading && (
        <React.Fragment>
          <ArenaRankings posts={currentPosts} currentPage={currentPage} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </React.Fragment>
      )}

      {error && (
        <div className="flex flex-col items-center mt-2">
          <p className="error">{error}</p>
        </div>
      )}
    </React.Fragment>
  );
};
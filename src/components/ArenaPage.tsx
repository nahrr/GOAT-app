import * as React from "react";
import { Table } from "./Table";
import Pagination from "./Pagination";
import Button from "./Button";
import Loader from "./Loading";
import { ArenaPosts } from "../Interface/IPost";
import { useEffect, useState } from "react";
import { activeStyle } from "./Button";
import { SearchBar } from "./SearchBar";
import { useAxios } from "./Api";

export type ActiveButton = {
  twos: boolean;
  threes: boolean;
  fives: boolean;
  seasonOne: boolean;
  seasonTwo: boolean;
};

const prodURL = "https://arenarankingsapigoat.azurewebsites.net/api/ranks/";
const devURL = "http://localhost:7071/api/ranks/";

export const ArenaPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const [bracket, setBracket] = React.useState<string>("2v2");
  const [season, setSeason] = useState<string>("/2");

  const [buttonStyle, setButtonStyle] = useState<ActiveButton>({
    twos: true,
    threes: false,
    fives: false,
    seasonOne: false,
    seasonTwo: true,
  });
  const axiosOptions = {
    method: "get",
    url: devURL + bracket + season,
    headers: {
      accept: "*/*",
    },
  };

  const { response, loading, error } = useAxios(axiosOptions);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<ArenaPosts[]>(response);
  const [iniPosts, setIniPosts] = useState<ArenaPosts[]>(response);
  console.log(loading);
  useEffect(() => {
    setPosts(response);
    setIniPosts(response);
    setIsLoading(loading);
  }, [response, loading]);

  //Get current posts
  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentPosts: any = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page to
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [searchWord, setSearchWord] = useState<string>("");
  const filter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      const results = response.filter((user) => {
        let teamName = user.team.name.toLowerCase();
        return teamName.startsWith(keyword.toLowerCase());
      });
      setPosts(results);
    } else {
      setPosts(iniPosts);
    }
    setSearchWord(keyword);
  };

  return (
    <React.Fragment>
      <div className="flex flex-col w-full items-center justify-between lg:flex lg:flex-row  lg:mx-auto lg:w-2/3 lg:mt-6">
        <div className="">
          <Button
            onClick={() => {
              setBracket("2v2");
              setIsLoading(true);
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
              setIsLoading(true);
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
              setIsLoading(true);
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
        <div className="mt-6 lg:mt-0 lg:w-1/3">
          <SearchBar
            filter={(e: React.ChangeEvent<HTMLInputElement>) => {
              filter(e);
            }}
            value={searchWord}
          />
        </div>
        <div className="mt-6 lg:mt-0">
          <Button
            onClick={() => {
              setIsLoading(true);
              setSeason("/1");
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
              setIsLoading(true);
              setSeason("/2");
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
      {isLoading && <Loader />}
      {!isLoading && (
        <React.Fragment>
          <Table posts={currentPosts} currentPage={currentPage} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={response.length}
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

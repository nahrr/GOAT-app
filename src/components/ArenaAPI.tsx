import * as React from "react";
import { ArenaRankings } from "./ArenaRankings";
import axios from "axios";

export interface IPost {
  id: number;
  name: string;
  realm: string;
  region: string;
  season: string;
  bracket: string;
  faction: string;
  rating: number;
  rank: number;
  members: members;
}

export type members = {
  won: string;
  lost: string;
  name: string;
  rating: number;
  class: string;
};
const defaultPosts: IPost[] = [];

export const ArenaRankingsFetcher = () => {
  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] =
    React.useState(defaultPosts);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] =
    React.useState("");

  const url =
    "https://arenamaster.io/api/v1/tbc_teams?bracket=3v3&faction=alliance&region=eu&per_page=10&page=1";

  React.useEffect(() => {
    axios
      .get<IPost[]>(url, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      })
      .then((response) => {
        setPosts(response.data);

        console.log(response.data);
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

  return (
    <div>
      {loading}

      <ArenaRankings posts={posts} />

      {error && <p className="error">{error}</p>}
    </div>
  );
};
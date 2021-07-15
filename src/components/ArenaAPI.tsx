import * as React from "react";
import { ArenaRankings } from "./ArenaRankings";
import axios from "axios";

export interface IPost {
  _links?:  Links;
  season?:  Season;
  name?:    string;
  bracket?: Bracket;
  entries: Entry[];
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export interface Bracket {
  id:   number;
  type: string;
}

export interface Entry {
  faction?:                Faction;
  rank:                    number;
  rating:                  number;
  season_match_statistics: SeasonMatchStatistics;
  team:                    Team;
}

export interface Faction {
  type: Type;
}

export enum Type {
  Alliance = "ALLIANCE",
  Horde = "HORDE",
}

export interface SeasonMatchStatistics {
  played: number;
  won:    number;
  lost:   number;
}

export interface Team {
  name:     string;
  realm:    Realm;
  crest:    Crest;
  members?: Member[];
  id:       number;
}

export interface Crest {
  emblem:     Border;
  border:     Border;
  background: Background;
}

export interface Background {
  color: Color;
}

export interface Color {
  rgba: RGBA;
}

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Border {
  id:    number;
  media: Season;
  color: Color;
}

export interface Season {
  key: Self;
  id:  number;
}

export interface Member {
  character:               Character;
  season_match_statistics: SeasonMatchStatistics;
  rating:                  number;
}

export interface Character {
  name:           string;
  id:             number;
  realm:          Realm;
  playable_class: Season;
  playable_race:  Season;
}

export interface Realm {
  key:  Self;
  id:   number;
}

const defaultPosts: IPost[] = [];

export const ArenaRankingsFetcher = () => {
  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] =
    React.useState(defaultPosts);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] =
    React.useState("");

  const url2 = "http://localhost:7071/api/Function1?arena=johan";

  React.useEffect(() => {
    axios
      .get<IPost[]>(url2, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 1000000,
      })
      .then((response) => {
        console.log(Object.keys(response.data))
        
        setPosts(response.data);
        console.log("from fetch " + response.data);
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
console.log(posts[4])
  return (
    <div>
      {loading}

      <ArenaRankings posts={posts} />

      {error && <p className="error">{error}</p>}
    </div>
  );
};

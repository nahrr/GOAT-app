import axios from "axios";
import { TeamCard } from "./TeamCard";
import { useEffect, useState } from "react";
type TeamProps = {
  name?: string;
  class?: string;
  spec?: string;
  race?: string;
};

const defaultPosts: TeamProps[] = [];

export const Team = () => {
  const [team, setTeam]: [TeamProps[], (team: TeamProps[]) => void] =
    useState(defaultPosts);
  useEffect(() => {
    axios
      .get("MockData.json")
      .then((res) => {
        console.log(res.data.players);
        setTeam(res.data.players);
      })
      .catch((err: any) => console.error(err));
  }, []);

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="w-full">
        <div className="flex flex-col flex-wrap gap-4 items-center justify-center mx-auto w-4/5 md:flex md:flex-row md:flex-wrap md:gap-4 md:items-start md:justify-center">
          {team.map((player, i) => (
            <TeamCard
              key={i}
              name={player.name}
              class={player.class}
              spec={player.spec}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

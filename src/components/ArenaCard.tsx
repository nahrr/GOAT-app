import React, { useEffect, useLayoutEffect, useState } from "react";
import { ArenaPosts } from "../Interface/IPost";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/solid";

type ArenaCardProps = {
  post?: ArenaPosts;
  rank: number;
  team: string;
  rating: number;
  faction: string | null;
  realm: string;
  key: number;
  class: any;
  played: number;
  won: number;
  lost: number;
  name?: any;
  currentPage: number;
};

type FactionType = {
  img: string;
  color: string;
};

export const ArenaCard = (props: ArenaCardProps) => {
  const [expanded, setExpanded] = useState<boolean>();

  useEffect(() => {
    setExpanded(false);
  }, [props.currentPage]);

  const faction: FactionType = {
    img: "",
    color: "",
  };

  props.faction === "ALLIANCE"
    ? (faction.color = "text-blue-500")
    : (faction.color = "text-red");
  props.faction === "ALLIANCE"
    ? (faction.img = "/images/assets/alliance.webp")
    : (faction.img = "/images/assets/horde.webp");

  const classId: string[] = [];
  
  props.class.forEach(function (classRef: string) {
    let classes = classRef.trim();

    switch (classes) {
      case "1":
        classId.push("/images/assets/classicon_warrior.jpg");
        break;
      case "2":
        classId.push("/images/assets/classicon_paladin.jpg");
        break;
      case "3":
        classId.push("/images/assets/classicon_hunter.jpg");
        break;
      case "4":
        classId.push("/images/assets/classicon_rogue.jpg");
        break;
      case "5":
        classId.push("/images/assets/classicon_priest.jpg");
        break;
      case "7":
        classId.push("/images/assets/classicon_shaman.jpg");
        break;
      case "8":
        classId.push("/images/assets/classicon_mage.jpg");
        break;
      case "9":
        classId.push("/images/assets/classicon_warlock.jpg");
        break;
      case "11":
        classId.push("/images/assets/classicon_druid.jpg");
        break;
      default:
        classId.push("/images/assets/questionmark.jpg");
    }
  });

  let winPercent: number = (props.won / props.played) * 100;

  return (
    <React.Fragment>
      <tr
        className="cursor-pointer border-t-2 border-yellow-100"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="text-grey py-4 font-medium">
          {expanded ? (
            <ChevronDoubleUpIcon className="h-6 w-6" />
          ) : (
            <ChevronDoubleDownIcon className="h-6 w-6" />
          )}
        </td>
        <td className="text-green-400 py-4 font-medium">{props.rank}</td>
        <td className="text-red py-4 px-0">{props.team}</td>
        <td className="flex flex-row items-center justify-start py-4 truncate">
          {classId.map((classPicture, i) => (
            <img
              key={i}
              className="h-8 object-cover rounded-2xl"
              src={classPicture}
              alt="class"
            />
          ))}
        </td>

        <td className={`justify-center uppercase font-medium ${faction.color}`}>
          <img
            src={faction.img}
            className="w-8 h-8 object-cover rounded-full inline-block mr-4"
          />
          {props.realm}
        </td>
        <td className="text-white py-4 px-6 font-medium">{props.rating}</td>
      </tr>

      {expanded && (
        <>
          <tr className="border-t-2 border-dashed border-yellow-100 border-opacity-25">
            <th></th>
            <th></th>
            <th className="text-white text-white py-1 px-6">Members</th>
            <th className="text-white text-white py-1 px-6">Win %</th>
            <th className="text-white text-white py-1 px-6">Won</th>
            <th className="text-white text-white py-1 px-6">Lost</th>
          </tr>
          <tr className="">
            <td></td>
            <td></td>
            <td className="text-red py-4 px-6 font-medium whitespace-pre-line">
              {props.name.join("\n")}
            </td>
            <td className="text-green-300 py-4 px-6 font-medium">
              {Math.round(winPercent) + "%"}
            </td>
            <td className="text-green-300 py-4 px-6 font-medium">
              {props.won}
            </td>
            <td className="text-red-300 py-4 px-6 font-medium">{props.lost}</td>
          </tr>
        </>
       )}
    </React.Fragment>
  );
};

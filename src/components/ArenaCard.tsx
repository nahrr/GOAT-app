import React from "react";
import { IPost } from "./ArenaAPI";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/solid";

type ArenaCardProps = {
  post?: IPost;
  rank: number;
  team: string;
  rating: number;
  faction: string;
  realm: string;
  key: number;
  class: any;
  played: number;
  won: number;
  lost: number;
};

interface ArenaCardState {
  factionType: string;
  expanded: boolean;
}

export class ArenaCard extends React.Component<ArenaCardProps, ArenaCardState> {
  constructor(props: ArenaCardProps) {
    super(props);

    this.state = {
      factionType: this.props.faction,
      expanded: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  }

  render() {
    let classId: (string | undefined)[] = [];
    let factionImage;
    let factionStyle;
    let winPercent = (this.props.won / this.props.played) * 100;
    if (this.props.class) {
      this.props.class.forEach(function (arrayItem: any) {
        let classes = arrayItem.trim();

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
        }
      });
    }

    if (this.props.faction === "ALLIANCE") {
      factionImage = "/images/assets/alliance.webp";
      factionStyle = "text-blue-500";
    } else if (this.props.faction === "HORDE") {
      factionImage = "/images/assets/horde.webp";
      factionStyle = "text-red";
    }

    return (
      <React.Fragment>
        <tr className="cursor-pointer" onClick={this.handleClick}>
          <td>
            {this.state.expanded ? (
              <ChevronDoubleUpIcon className="h-6 w-6" />
            ) : (
              <ChevronDoubleDownIcon className="h-6 w-6" />
            )}
          </td>
          <td className="">
            <div>
              <p className="text-green-400 py-4 px-6 font-medium">
                {this.props.rank}
              </p>
            </div>
          </td>
          <td className="text-red py-4 px-6">{this.props.team}</td>
          <td className="justify-center mr-2">
            {classId.map((classPicture, i) => (
                 <img
                 key={i}
                 className="inline-block w-8 h-8 object-cover rounded-lg"
                 src={classPicture}
                 alt="class"
               />
            ))}
          </td>
          <td className={"py-4 px-6 uppercase font-medium " + factionStyle}>
            <img
              src={factionImage}
              className="w-8 h-8 object-cover rounded-full inline-block mr-4"
              alt={factionImage}
            />
            {this.props.realm}
          </td>
          <td className="text-white py-4 px-6 font-medium">
            {this.props.rating}
          </td>
        </tr>
        <tr className="">
          {this.state.expanded ? (
            <td className="text-white py-4 px-6 font-medium">
              {Math.round(winPercent) + "%"} {"Wins:" + this.props.won}
              {"Lost: " + this.props.lost}
            </td>
          ) : (
            null
          )}
        </tr>
      </React.Fragment>
    );
  }
}
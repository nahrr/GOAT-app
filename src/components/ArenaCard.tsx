import React from 'react';
import { IPost } from "./ArenaAPI";

type ArenaCardProps = {
  post?: IPost,
  rank: number,
  team: string,
  rating: number
  faction: string,
  realm: string,
  key: number,
  class: any
}

interface ArenaCardState {
  factionType: string;
  expanded: boolean;
  playerClass: [];
}

export class ArenaCard extends React.Component<ArenaCardProps, ArenaCardState>{

  constructor(props: ArenaCardProps) {
    super(props)

    this.state = {
      factionType: this.props.faction,
      expanded: false,
      playerClass: this.props.class
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }
  /*
  warrior: 1
  paladin: 2
  hunter: 3
  rogue: 4
  priest: 5
  shaman: 7
  mage: 8
  warlock: 9
  druid: 11
  */

  render() {

    let classId = ["x"]

    if (this.state.playerClass) {
      this.state.playerClass.forEach(function (arrayItem: any) {
        let classes = arrayItem.trim()


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
            classId.push("/images/assets/classicon_druid.jpg")
            break;
        }
      });
    }

    let factionImage;
    let factionStyle;
    if (this.props.faction === "ALLIANCE") {
      factionImage = "/images/assets/alliance.webp"
      factionStyle = "text-blue-500";
    }
    else if (this.props.faction === "HORDE") {
      factionImage = "/images/assets/horde.webp"
      factionStyle = "text-red";
    }

    return (
      <><tr className="cursor-pointer" onClick={this.handleClick} >
        <td className="">
          <div>
            <p className="text-green-400 py-4 px-6 font-medium"> {this.props.rank} </p>
          </div>
        </td>
        <td className="text-red py-4 px-6">{this.props.team}</td>
        <td className="text-red py-4 px-6">
          <img src={factionImage}
            className="w-10 h-10 object-cover rounded-full"
            alt={factionImage} />
        </td>
        <td className={"py-4 px-6 uppercase font-medium " + factionStyle}>{this.props.realm} </td>
        <td className="text-white py-4 px-6 font-medium"> {this.props.rating}</td>
        </tr>
        <tr className="" >{this.state.expanded ?
         
          <td className="justify-center inline-block">
            <img className="inline-block mx-auto" src={classId[1]} alt="" />
            <img className="inline-block mx-auto" src={classId[2]} alt="" />
            <img className="inline-block mx-auto" src={classId[3]} alt="" />
          </td>
          : ""}</tr>
      </>
    )
  }
}


type Team = {
  name?: string;
  class?: string;
  spec?: string;
  race?: string;
};

export const TeamCard = (props: Team) => {
  let classColor: string = "";
  let playerClass: string = "";
  let pC = props.class?.toLowerCase();
  switch (pC) {
    case "warrior":
      playerClass = "/images/assets/classicon_warrior.jpg";
      classColor = "#C69B6D";
      break;
    case "paladin":
      playerClass = "/images/assets/classicon_paladin.jpg";
      classColor = "#F48CBA";
      break;
    case "hunter":
      playerClass = "/images/assets/classicon_hunter.jpg";
      classColor = "#AAD372";
      break;
    case "rogue":
      playerClass = "/images/assets/classicon_rogue.jpg";
      classColor = "#FFF468";
      break;
    case "priest":
      playerClass = "/images/assets/classicon_priest.jpg";
      classColor = "#FFFFFF";
      break;
    case "shaman":
      playerClass = "/images/assets/classicon_shaman.jpg";
      classColor = "#0070DD";
      break;
    case "mage":
      playerClass = "/images/assets/classicon_mage.jpg";
      classColor = "#3FC7EB";
      break;
    case "warlock":
      playerClass = "/images/assets/classicon_warlock.jpg";
      classColor = "#8788EE";
      break;
    case "druid":
      playerClass = "/images/assets/classicon_druid.jpg";
      classColor = "#FF7C0A";
      break;
  }
  return (
    <div className="w-4/5 rounded-lg md:w-2/5 lg:w-2/5 xl:w-1/5">
      <div className="bg-black border-2 border-white rounded-lg bg-black my-auto mx-auto">
        <div className="flex flex-col justify-center items-center md:flex md:flex-row md:justify-between">
        <div
          className="mb-4 text-xl font-bold uppercase ml-8 mt-4 mr-8 truncate
          "
          style={{ color: classColor }}
        >
          {props.name}
        </div>
        <img
          className="rounded-full w-16 mt-4 mr-4"
          src={playerClass}
          alt="GOAT"
        />
      </div>
        <div className="px-10 py-6 mb-10 text-left">
          <p className="text-sm text-blue-300">{props.race}</p>
          <p className="text-sm text-blue-300">{props.spec}</p>
        </div>
      </div>
    </div>
  );
};

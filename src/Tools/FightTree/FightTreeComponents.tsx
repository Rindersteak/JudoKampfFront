import React from "react";

import { Fight, Fightgroup } from "../../types";
import TreeForTwo from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForTwo";
import TreeForNone from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForNone";
import TreeForThreeToSix from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForThreeToSix";
import TreeForSevenToEight from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForSevenToEight";
import TreeForMoreThanEight from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForMoreThanEight";
import { getFightersListByFightgroupId } from "../../API/fightGroupAPI";

export const getFightTreeComponent = async (fightgroup: Fightgroup) => {
  const fighters = await getFightersListByFightgroupId(fightgroup.id);
  const participants = fighters.length;

  let componentName;
  if (participants < 2) {
    componentName = "TreeForNone";
  } else if (participants === 2) {
    componentName = "TreeForTwo";
  } else if (participants >= 3 && participants <= 6) {
    componentName = "TreeForThreeToSix";
  } else if (participants >= 7 && participants <= 8) {
    componentName = "TreeForSevenToEight";
  } else if (participants > 8) {
    componentName = "TreeForMoreThanEight";
  } else {
    componentName = null;
  }

  return { component: componentName, id: fightgroup.id, count: participants };
};

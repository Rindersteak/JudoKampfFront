import React from "react";
import { Fight, Fightgroup } from "../../types";
import TreeForTwo from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForTwo";
import TreeForNone from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForNone";
import TreeForThreeToSix from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForThreeToSix";
import TreeForSevenToEight from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForSevenToEight";
import TreeForMoreThanEight from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForMoreThanEight";

export const getFightTreeComponent = (fightgroup: Fightgroup) => {
  const participants = fightgroup.fighters.length;

  if (participants < 2) {
    return { component: TreeForNone, id: fightgroup.id, count: participants };
  } else if (participants === 2) {
    return { component: TreeForTwo, id: fightgroup.id, count: participants };
  } else if (participants >= 3 && participants <= 6) {
    return { component: TreeForThreeToSix, id: fightgroup.id, count: participants };
  } else if (participants >= 7 && participants <= 8) {
    return { component: TreeForSevenToEight, id: fightgroup.id, count: participants };
  } else if (participants > 8) {
    return { component: TreeForMoreThanEight, id: fightgroup.id, count: participants };
  } else {
    return { component: null, id: fightgroup.id, count: participants };
  }
};

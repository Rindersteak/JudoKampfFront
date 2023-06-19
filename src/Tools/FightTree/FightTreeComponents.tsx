import React from "react";

import { Fight, Fightgroup } from "../../types";
import TreeForTwo from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForTwo";
import TreeForNone from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForNone";
import TreeForThreeToSix from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForThreeToSix";
import TreeForSevenToEight from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForSevenToEight";
import TreeForMoreThanEight from "../../Pages/Tournament/TournamentTree/TournamentTrees/TreeForMoreThanEight";
import { getFightgroups } from "../../API/fightGroupAPI";

export const getFightTreeComponent = async (fightgroup: Fightgroup) => {
  const  fighters  = await getFightgroups(); 
  const participants = fighters.length;

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

export type AgeClass = {
  id: number;
  name: string;
  lowerAge: number;
  upperAge: number;
};

export type WeightClass = {
  id: number;
  name: string;
  upperBoundary: number;
  lowerBoundary: number;
};

export type Address = {
  id?: number;
  street: string;
  housenumber: string;
  city: string;
  state?: string;
  postalcode: string;
};

export type Club = {
  id?: number;
  shortname?: string;
  name?: string;
  address?: Address;
  stateassociation?: string;
};

export type Fighter = {
  id: number;
  sex: string;
  firstname: string;
  lastname: string;
  age?: number;
  birthdate: string;
  ageclass?: AgeClass;
  weight?: number;
  weightclass?: WeightClass;
  club: Club;
};

export type FighterAdd = {
  id?: number;
  sex: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  ageclass?: AgeClass;
  weight?: number;
  weightclass?: WeightClass;
  club: Club;
};

export type Fight = {
  id: number;
  fighterBlue: Fighter;
  fighterWhite: Fighter;
  blue_wazaari: number;
  blue_ippon: number;
  white_wazaari: number;
  white_ippon: number;
  fight_duration: number;
  blue_fouls: number;
  white_fouls: number;
  winner: Fighter;
  lastFight: any; 
  nextFight: any; 
};



export type Fightgroup = {
  id: number;
  name: string;
  tournament: Tournament;
  ageclass: AgeClass;
  weightclass: WeightClass;
  sex: string;
  fighters: Fighter[];
  fightpools: Fightpool[];
};

export type Tournament = {
  id: number;
  name: string;
  address: Address;
  location: string;
  startdate: string;
  enddate: string;
  fightgroups?: Fightgroup[];
  rule?: Rule;
};

export type Rule = {
  id: number;
  pointsWazaariAdult: number;
  pointsWazaariYouth: number;
  pointsIpponAdult: number;
  pointsIpponYouth: number;
  holdingTimeIpponAdult: number;
  holdingTimeIpponYouth: number;
  holdingTimeWazaariAdult: number;
  holdingTimeWazaariYouth: number;
  foulsAdult: number;
  foulsYouth: number;
  goldenScoreAdult: ["", "", ""];
  goldenScoreYouth: ["", "", ""];
};

export type Fightpool = {
 id: number;
 fighters: Fighter[];
 fights: Fight [];
};
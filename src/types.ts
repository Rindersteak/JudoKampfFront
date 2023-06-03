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
  shortname: string;
  name: string;
  address?: Address;
  stateassociation?: string;
};

export type Fighter = {
  id: number;
  sex: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  ageclass?: AgeClass;
  weight: number;
  weightclass?: WeightClass;
  club: Club;
};


export type Fight = {
  id: number;
  fighterBlue: Fighter;
  fighterWhite: Fighter;
  blue_wasari: number;
  blue_ippon: number;
  white_wasari: number;
  white_ippon: number;
  fight_duration: number;
  blue_fouls: number;
  white_fouls: number;
};


export type Tournament = {
  id: number,
  name: string,
  address: Address,
  ageclass: AgeClass,
  weightclass: WeightClass,
  code: string,  
  stateassociation: string;
  location: string,
  startdate: string,
  enddate: string,
  fighters: Fighter[],
  fights: Fight[]
}



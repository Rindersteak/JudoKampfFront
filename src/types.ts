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
  id: number;
  street: string;
  houseNumber: string;
  city: string;
  state: string;
  postalCode: string;
};

export type Club = {
  id: number;
  shortName: string;
  name: string;
  address: Address;
};

export type Fighter = {
  id: number;
  sex: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  ageclass: AgeClass;
  weight: number;
  weightclass: WeightClass;
  club: Club;
};

  

export type Tournament = {
    firstName: string;
    lastName: string;
    club: string;
    regionalAssociation: string;
    birthDate: string;
    weight: number;
};
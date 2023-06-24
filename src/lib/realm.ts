export type User = {
  id: string;
  email: string;
  password: string;
  syndic: boolean;
};

export const UserSchema = {
  name: "User",
  primaryKey: "id",
  properties: {
    id: "string",
    email: "string",
    password: "string",
    syndic: "bool",
  },
};

export type Session = {
  id: string;
  user: User;
};

export const SessionSchema = {
  name: "Session",
  primaryKey: "id",
  properties: {
    id: "string",
    user: "User",
  },
};

export type Car = {
  id: string;
  plate: string;
  user: User;
  status: string
};

export const CarSchema = {
  name: "Car",
  primaryKey: "id",
  properties: {
    id: "string",
    plate: "string",
    user: "User",
    status: "string"
  },
};

export type Access = {
  id: string;
  car: Car;
  date: Date;
  user: User;
};

export const AccessSchema = {
  name: "Access",
  primaryKey: "id",
  properties: {
    id: "string",
    car: "Car",
    date: "date",
    user: "User",
  },
};

import { Roles } from "../constants/roles";


export type User = {
  user_id: string;
  surnames: string;
  names: string;
  email: string;
  username: string;
  phone: string;
  user_roles: {
    name: Roles
  }[];
  community: {
    community_id: string;
    name: string;
  } | null
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

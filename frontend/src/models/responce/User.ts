export interface IUser {
  username: string;
  role: string;
  id: string;
}

export interface IEmployee {
  key?: string;
  id: number;
  first_name: string | null;
  last_name: string | null;
  father_name: string | null;
  full_name: string | null;
  position: string | null;
  phone: string | null;
  email: string | null;
  telegram: string | null;
  birthday: string | null;
  category: string | null;
  specialization: string | null;
  username: string;
  password?: string | null;
  notes: string | null;
  role: string;
  notification?: boolean;
}

export interface IEmployeeNotifaction {
  id: number;
  username: string;
  role: string;
  notification?: boolean;
}

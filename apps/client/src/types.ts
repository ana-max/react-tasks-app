export type Task = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user: User;
};

export type TaskCreationAttributes = {
  title: string;
  userId: number;
  completed: boolean;
}

export type User = {
  id: number;
  name: string;
}


import path from 'path';
import {
  Sequelize,
  SequelizeOptions
} from 'sequelize-typescript';
import {
  Task,
  User,
} from './models';
import {
  tasks,
  users,
} from './mocks';

export default async function connectDB(): Promise<Sequelize> {
  const sequelizeOptions: SequelizeOptions = {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../db.sqlite'),
    models: [
      User,
      Task,
    ]
  };

  const sequelize = new Sequelize(sequelizeOptions);

  // await sequelize.sync({
  //   force: true,
  // });
  // await Promise.all(
  //   User
  //     .bulkBuild(
  //       users.map((user) => ({
  //         id: user.id,
  //         name: user.name,
  //       } as User)),
  //     )
  //     .map(
  //       (newUser) =>
  //         newUser
  //           .save()
  //           .catch((err) => console.log(err))
  //     )
  // );
  // await Promise.all(
  //   Task
  //     .bulkBuild(
  //       tasks.map((task) => ({
  //         id: task.id,
  //         title: task.title,
  //         completed: task.completed,
  //         userId: task.userId,
  //       } as Task)),
  //     )
  //     .map(
  //       (newTask) =>
  //         newTask
  //           .save()
  //           .catch((err) => console.log(err))
  //     )
  // );
  return sequelize;
}

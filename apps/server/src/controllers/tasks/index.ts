import { Op } from "sequelize";
import {
  Task,
  TaskCreationAttributes,
  User,
} from "../../models"

export const getAllTasks = async (
  searchString: string,
  completed?: boolean,
  userIds?: number[],
): Promise<Task[]> => {
  const attrs = {} as any;
  if (typeof completed !== 'undefined') {
    attrs['completed'] = completed;
  }
  if (typeof userIds !== 'undefined' && userIds.length) {
    attrs['userId'] = userIds;
  }
  return await Task.findAll({
    where: {
      title: {
        [Op.substring]: searchString,
      },
      ...attrs,
   },
    include: [{
      model: User,
    }]
  });
}

export const getTasksByUserId = async (
  id: number,
  searchString: string
): Promise<Task[]> => {
  return await Task.findAll({
    where: {
      userId: id,
      title: {
        [Op.substring]: searchString,
      },
    },
    include: [{
      model: User,
    }],
  });
}

export const createTasks = async (
  tasks: TaskCreationAttributes[],
): Promise<Task[]> => {
  const newTasks = await Promise.all(
    Task
      .bulkBuild(
        tasks.map((task) => ({
          title: task.title,
          completed: task.completed,
          userId: task.userId,
        } as Task)),
      )
      .map(
        (newTask) =>
          newTask
            .save()
      )
  );
  return await Task.findAll({
    where: {
      id: newTasks.map((task) => task.id),
    },
    include: [{
      model: User,
    }]
  });
}

export const deleteTask = async (
  id: number,
): Promise<number> => {
  return await Task.destroy({
    where: {
      id,
    }
  });
}

export const updateTask = async (
  id: number,
  attributes: Partial<TaskCreationAttributes>,
): Promise<[number, Task[]]> => {
  return await Task.update({
    ...attributes,
  }, {
    where: {
      id,
    }
  });
}

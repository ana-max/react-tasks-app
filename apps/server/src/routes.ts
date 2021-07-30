import {
  Application,
} from 'express';
import {
  getAllTasks,
  getTasksByUserId,
  createTasks,
  getAllUsers,
  deleteTask,
  updateTask,
} from './controllers';

const route = (app: Application) => {
  app.get('/api/tasks*', async (req, res) => {
    const { searchString, userIds, status } = req.query;
    let completed;
    switch (status) {
      case 'ALL':
        break;
      case 'DONE':
        completed = true;
        break;
      case 'UNDONE':
        completed = false;
        break;
      default:
        break;
    }
  const data = await getAllTasks(
      searchString as string ?? '',
      completed,
      userIds?.length ? (userIds as string)?.split(',')?.map(Number) : undefined,
    );
    res.json(data);
  });

  app.post('/api/tasks', async (req, res) => {
    const { tasks } = req.body;
    const data = await createTasks(tasks);
    res.json(data);
  });

  app.put('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const data = await updateTask(Number(id), {
      title,
      completed,
    });
    res.json(data[1]);
  })

  app.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const data = await deleteTask(Number(id));
    res.json(data);
  });

  app.use('/api/users/:id/tasks*', async (req, res) => {
    const { id } = req.params;
    const { regex } = req.query;
    const data = await getTasksByUserId(Number(id), regex as string ?? '')
    res.json(data);
  });

  app.use('/api/users', async (_req, res) => {
    const data = await getAllUsers();
    res.json(data);
  })
}

export default route;

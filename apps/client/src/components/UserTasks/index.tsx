import React from 'react';
import {
  Container,
} from '@material-ui/core';
import { API_URL } from '../../config';
import {
  setApiTasks,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import TaskTable from '../TaskTable';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import { useSetTitle } from '../utils';

const UserTasks = () => {
  const [searchString, setSearchString] = React.useState<string>('');

  const { id } = useParams<{ id: string }>();

  const tasks = useAppSelector((store) => store.api.tasks);
  const newTask = useAppSelector((store) => store.client.task);
  const deletedTaskId = useAppSelector((store) => store.client.deletedTaskId);
  const changedStatusInfo = useAppSelector((store) => store.client.taskStatusInfo);
  const changesTitleInfo = useAppSelector((store) => store.client.taskTitleInfo);
  const dispatch = useAppDispatch();

  const setTitle = useSetTitle();

  React.useEffect(() => {
    if (newTask.status === 'ready' && tasks.status === 'ready') {
      dispatch(setApiTasks({
        status: 'ready',
        value: [
          newTask.value,
          ...tasks.value,
        ],
      }));
      setTitle(`Список задач (${tasks.value.length})`);
    }
  }, [newTask.status]);

  React.useEffect(() => {
    if (deletedTaskId.status === 'ready' && tasks.status === 'ready') {
      dispatch(setApiTasks({
        status: 'ready',
        value: tasks
          .value
          .filter((t) => t.id !== deletedTaskId.value),
      }));
      setTitle(`Список задач (${tasks.value.length})`);
    }
  }, [deletedTaskId.status]);

  React.useEffect(() => {
    if (changedStatusInfo.status === 'ready' && tasks.status === 'ready') {
      dispatch(setApiTasks({
        status: 'ready',
        value: tasks
          .value
          .map((item) => (item.id === changedStatusInfo.value.id
            ? ({
              ...item,
              completed: changedStatusInfo.value.completed
            })
            : item),
          )
      }))
    }
  }, [changedStatusInfo.status]);

  React.useEffect(() => {
    if (changesTitleInfo.status === 'ready' && tasks.status === 'ready') {
      dispatch(setApiTasks({
        status: 'ready',
        value: tasks
          .value
          .map((item) => (item.id === changesTitleInfo.value.id
            ? ({
              ...item,
              title: changesTitleInfo.value.title
            })
            : item),
          )
      }));
      setTitle(`Список задач (${tasks.value.length})`);
    }
  }, [changesTitleInfo.status]);

  React.useEffect(() => {
    dispatch(setApiTasks({
      status: 'loading',
    }));
    fetch(`${API_URL}/api/users/${id}/tasks${searchString ? `?searchString=${searchString}` : ''}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setApiTasks({
          status: 'ready',
          value: data,
        }));
        setTitle(`Список задач (${data.length})`);
      })
      .catch((error) => {
        dispatch(setApiTasks({
          status: 'error',
          value: error,
        }));
      });
  }, [searchString]);

  const tasksRender = () => {
    switch (tasks.status) {
      case 'ready':
        return (
          <TaskTable
            tasks={tasks.value}
          />
        );
      case 'loading':
        return (
          <div>Loading...</div>
        );
      case 'error':
        return (
          <div>{tasks.value}</div>
        );
      default:
        return <></>;
    }
  }

  return (
    <Container maxWidth="xl">
      <Header
        headerText="Список задач пользователя"
        searchString={searchString}
        changeSearchString={setSearchString}
      />
      {
        tasksRender()
      }
    </Container>
  );
}

export default UserTasks;

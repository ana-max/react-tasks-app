import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  FormControlLabel,
  IconButton,
  Switch,
  TableCell,
  TableRow,
  TextField,
} from '@material-ui/core';
import {
  CancelOutlined,
  CheckBoxOutlined,
  CheckCircleOutline,
  CreateOutlined,
  ErrorOutline,
} from '@material-ui/icons';
import {
  Task,
} from '../../../types';
import {
  useAppDispatch,
  setChangeTaskStatus,
  setChangeTaskTitle,
  setDeletedClientTaskId,
} from '../../../store';
import useStyles from '../styles';
import { API_URL } from '../../../config';

type TaskTableRowProps = {
  task: Task;
};

const TaskTableRow = ({
  task,
}: TaskTableRowProps) => {
  const [taskTitle, setTaskTitle] = React.useState<string>(task.title);
  const [isEditNameMode, setIsEditNameMode] = React.useState<boolean>(false);

  const styles = useStyles();
  const dispatch = useAppDispatch();

  return (
    <TableRow key={task.id}>
      <TableCell align="left">
        <div className={styles.statusContainer}>
          <FormControlLabel
            control={
              <Switch
                checked={task.completed}
                onChange={(e) => {
                  dispatch(setChangeTaskStatus({
                    status: 'loading',
                  }));
                  fetch(`${API_URL}/api/tasks/${task.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      id: task.id,
                      completed: e.target.checked,
                    })
                  })
                    .then(() => {
                      dispatch(setChangeTaskStatus({
                        status: 'ready',
                        value: {
                          id: task.id,
                          completed: !e.target.checked,
                        },
                      }));
                    })
                    .catch((error) => {
                      dispatch(setChangeTaskStatus({
                        status: 'error',
                        value: error,
                      }));
                    });
                }}
                color="primary"
              />
            }
            label={'Выполнено'}
          />
        </div>
      </TableCell>
      <TableCell align="left">
        <Link
          className={styles.link}
          to={`/users/${task.user.id}/tasks`}>{task.user.name}
        </Link>
      </TableCell>
      <TableCell align="left">
        {isEditNameMode ? <></> : task.title}
        {
          isEditNameMode
            ? (
              <>
                <TextField
                  required
                  name="title"
                  id="title"
                  label="Название"
                  variant="outlined"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
                <IconButton
                  type="submit"
                  onClick={() => {
                    dispatch(setChangeTaskTitle({
                      status: 'loading',
                    }));
                    fetch(`${API_URL}/api/tasks/${task.id}`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        id: task.id,
                        title: taskTitle,
                      })
                    })
                      .then(() => {
                        dispatch(setChangeTaskTitle({
                          status: 'ready',
                          value: {
                            id: task.id,
                            title: taskTitle,
                          },
                        }));
                      })
                      .catch((error) => {
                        dispatch(setChangeTaskTitle({
                          status: 'error',
                          value: error,
                        }));
                      });
                    setIsEditNameMode(false);
                  }}
                >
                  <CheckBoxOutlined />
                </IconButton>
              </>
            )
            : (
              <IconButton
                type="submit"
                onClick={() => setIsEditNameMode(true)}
              >
                <CreateOutlined />
              </IconButton>
            )
        }
      </TableCell>
      <TableCell align="center">
        <IconButton>
          <CancelOutlined
            onClick={() => {
              dispatch(setDeletedClientTaskId({
                status: 'loading',
              }));
              fetch(`${API_URL}/api/tasks/${task.id}`, {
                method: 'DELETE',
              })
                .then((response) => response.json())
                .then((data) => {
                  dispatch(setDeletedClientTaskId({
                    status: 'ready',
                    value: task.id,
                  }));
                })
                .catch((error) => {
                  dispatch(setDeletedClientTaskId({
                    status: 'error',
                    value: error,
                  }));
                });
            }}
          />
        </IconButton>
      </TableCell>
    </TableRow >
  );
};

export default TaskTableRow;

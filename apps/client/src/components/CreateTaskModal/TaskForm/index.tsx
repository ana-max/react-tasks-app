import * as React from 'react';
import * as Yup from 'yup';
import {
  useFormik,
} from 'formik';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import {
  useAppDispatch,
  useAppSelector,
  setAddedClientTask,
  setApiUsers,
} from '../../../store';
import { API_URL } from '../../../config';
import useStyles from './styles';
import { useParams } from 'react-router-dom';

const TaskSchema = Yup.object({
  title: Yup
    .string()
    .max(250, 'Слишком длинное название')
    .required('Обязательное поле'),
  userId: Yup
    .number()
    .required('Выберите пользователя'),
  status: Yup
    .string()
    .required('Выберите статус'),
});

type TaskFormProps = {
  closeModal: () => void;
};

export const TaskForm = ({
  closeModal,
}: TaskFormProps) => {
  const users = useAppSelector((store) => store.api.users);
  const dispatch = useAppDispatch();
  const styles = useStyles();

  const { id } = useParams<{ id?: string }>();

  const taskFormik = useFormik({
    initialValues: {
      title: '',
      userId: id ?? -1,
      status: 'UNDONE',
    },
    validationSchema: TaskSchema,
    onSubmit: (values, helpers) => {
      helpers.validateForm().then(() => {
        dispatch(setAddedClientTask({
          status: 'loading',
        }));
        const { title, userId, status } = values;
        fetch(`${API_URL}/api/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tasks: [{
              title,
              userId,
              completed: status === 'DONE',
            }]
          })
        })
          .then((response) => response.json())
          .then((data) => {
            dispatch(setAddedClientTask({
              status: 'ready',
              value: data[0],
            }));
          })
          .catch((error) => {
            dispatch(setAddedClientTask({
              status: 'error',
              value: error,
            }));
          });
        closeModal();
      });
    },
  })

  const [isSelectStatusOpen, setIsSelectStatusOpen] = React.useState<boolean>(false);
  const [isSelectUsersOpen, setIsSelectUsersOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(setApiUsers({
      status: 'loading',
    }));
    fetch(`${API_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setApiUsers({
          status: 'ready',
          value: data,
        }));
      })
      .catch((error) => {
        dispatch(setApiUsers({
          status: 'error',
          value: error,
        }));
      });
  }, []);

  const usersRender = () => {
    switch (users.status) {
      case 'ready':
        return (
          <FormControl className={styles.formControl}>
            <InputLabel id="controlled-open-select-users-label">Пользователь</InputLabel>
            <Select
              labelId="controlled-open-select-users-label"
              id="controlled-open-select-users"
              name="userId"
              open={isSelectUsersOpen}
              onClose={() => setIsSelectUsersOpen(false)}
              onOpen={() => setIsSelectUsersOpen(true)}
              value={taskFormik.values.userId}
              disabled={!!id}
              onChange={taskFormik.handleChange}
              error={taskFormik.touched.userId && Boolean(taskFormik.errors.userId)}
            >
              {
                users.value.map((user) => (
                  <MenuItem value={user.id}>{user.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        );
      case 'loading':
        return (
          <div>Loading...</div>
        );
      case 'error':
        return (
          <div>{users.value}</div>
        );
      default:
        return <></>;
    }
  }

  return (
    <div className={styles.modal}>
      <h2>Создание задачи</h2>
      <form
        className={styles.form}
        onSubmit={taskFormik.handleSubmit}
      >
        <TextField
          required
          name="title"
          id="title"
          label="Название"
          placeholder="Введите название задачи"
          variant="outlined"
          value={taskFormik.values.title}
          onChange={taskFormik.handleChange}
          error={taskFormik.touched.title && Boolean(taskFormik.errors.title)}
          helperText={taskFormik.touched.title && taskFormik.errors.title}
        />
        {usersRender()}
        <FormControl className={styles.formControl}>
          <InputLabel id="controlled-open-select-label">Статус</InputLabel>
          <Select
            name="status"
            labelId="controlled-open-select-label"
            id="controlled-open-select"
            open={isSelectStatusOpen}
            onClose={() => setIsSelectStatusOpen(false)}
            onOpen={() => setIsSelectStatusOpen(true)}
            value={taskFormik.values.status}
            onChange={taskFormik.handleChange}
            error={taskFormik.touched.status && Boolean(taskFormik.errors.status)}
          >
            <MenuItem value="DONE">Выполнено</MenuItem>
            <MenuItem value="UNDONE">Не выполнено</MenuItem>
          </Select>
        </FormControl>
        <Button
          className={styles.button}
          variant="contained"
          color="primary"
          type="submit"
        >
          Создать
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;

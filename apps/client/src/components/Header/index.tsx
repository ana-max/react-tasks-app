import React from 'react';
import {
  Button,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputBase,
  Radio,
  RadioGroup,
  Select,
} from '@material-ui/core';
import {
  FilterListOutlined,
} from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';
import CreateTaskModal from '../CreateTaskModal';
import {
  useAppDispatch,
  useAppSelector,
  setApiUsers,
  setApiTasks,
} from '../../store';
import {
  useParams,
} from 'react-router-dom';
import { API_URL } from '../../config';
import { useSetTitle } from '../utils';

type HeaderProps = {
  searchString: string;
  changeSearchString: (value: string) => void;
  headerText?: string;
};

const Header = ({
  headerText,
  searchString,
  changeSearchString,
}: HeaderProps) => {
  const users = useAppSelector((store) => store.api.users);
  const dispatch = useAppDispatch();

  const setTitle = useSetTitle();

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);
  const [isSelectUsersOpen, setIsSelectUsersOpen] = React.useState<boolean>(false);
  const [taskStatus, setTaskStatus] = React.useState<string>('ALL');
  const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([] as string[]);
  const styles = useStyles();
  const { id } = useParams<{ id?: string }>();

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
            <FormLabel component="legend">Пользователь</FormLabel>
            <Select
              labelId="controlled-open-select-users-label"
              id="controlled-open-select-users"
              name="userId"
              open={isSelectUsersOpen}
              onClose={() => setIsSelectUsersOpen(false)}
              onOpen={() => setIsSelectUsersOpen(true)}
              value={selectedUserIds}
              disabled={!!id}
              onChange={(e) => setSelectedUserIds([...selectedUserIds, e.target.value as string])}
              multiple
              native
              inputProps={{
                id: 'select-multiple-native',
                className: styles.select
              }}
            >
              {users.value.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
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
    <div className={styles.headerPage}>
      <h2>{headerText ?? 'Список задач'}</h2>
      <div className={styles.actions}>
        <IconButton type="submit" className={styles.iconButton}>
          <SearchIcon />
        </IconButton>
        <InputBase
          className={styles.input}
          placeholder="Поиск"
          value={searchString}
          onChange={(event) => changeSearchString(event.target.value)}
        />
        <IconButton onClick={() => setIsFilterOpen(true)}>
          <FilterListOutlined />
        </IconButton>
        <Button onClick={() => setIsModalOpen(true)}>Создать</Button>
      </div>
      <Drawer
        anchor="right"
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      >
        <div className={styles.drawer}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Статус задачи</FormLabel>
            <RadioGroup name="gender1" value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
              <FormControlLabel value="ALL" control={<Radio />} label="Все" />
              <FormControlLabel value="DONE" control={<Radio />} label="Выполнено" />
              <FormControlLabel value="UNDONE" control={<Radio />} label="Не выполнено" />
            </RadioGroup>
          </FormControl>
          <Divider />
          {usersRender()}
          <Button
            className={styles.submitButton}
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => {
              const path = '/api/tasks';
              const url = new URL(API_URL);
              url.pathname = path;
              const params = {
                searchString,
                status: taskStatus,
                userIds: !!id ? [id]: selectedUserIds,
              }
              const paramToQuery = (paramValue: [string, any]) => url.searchParams.set(...paramValue);
              Object.entries(params).forEach(paramToQuery);

              dispatch(setApiTasks({
                status: 'loading',
              }));
              fetch(url.toString())
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
              setIsFilterOpen(false);
            }}
          >
            Применить
          </Button>
          <Button
            className={styles.resetButton}
            variant="contained"
            color="secondary"
            type="submit"
            onClick={() => {
              setSelectedUserIds([]);
              setTaskStatus('ALL');
            }}
          >
            Сбросить
          </Button>
        </div>
      </Drawer>
      {isModalOpen && (
        <CreateTaskModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Header;

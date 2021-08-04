import {
  createSlice,
} from '@reduxjs/toolkit';
import {
  Task,
  User,
} from '../../types';

const StatusError = 'error';
const StatusReady = 'ready';
const StatusLoading = 'loading';

type ApiData<T> =
  { status: typeof StatusError, value: Error }
  | { status: typeof StatusLoading }
  | { status: typeof StatusReady, value: T };

type ApiState = {
  tasks: ApiData<Task[]>,
  users: ApiData<User[]>,
}

type ApiCaseReducers = {
  setApiTasks: (state: ApiState, action: { payload: ApiData<Task[]> }) => void;
  setApiUsers: (state: ApiState, action: { payload: ApiData<User[]> }) => void;
}

const apiSlice = createSlice<ApiState, ApiCaseReducers, 'api'>({
  name: 'api',
  initialState: {
    tasks: {
      status: 'ready',
      value: [],
    },
    users: {
      status: 'ready',
      value: [],
    }
  },
  reducers: {
    setApiTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setApiUsers: (state, action) => {
      state.users = action.payload;
    }
  }
});

export const { setApiTasks, setApiUsers } = apiSlice.actions;

export const apiReducer = apiSlice.reducer;

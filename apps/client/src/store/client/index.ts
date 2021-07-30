import {
  createSlice,
} from '@reduxjs/toolkit';
import {
  Task,
} from '../../types';

const StatusError = 'error';
const StatusReady = 'ready';
const StatusLoading = 'loading';

type ClientData<T> =
  { status: typeof StatusError, value: Error }
  | { status: typeof StatusLoading }
  | { status: typeof StatusReady, value: T };

type ClientState = {
  task: ClientData<Task>;
  deletedTaskId: ClientData<number>;
  taskStatusInfo: ClientData<{ id: number, completed: boolean }>;
  taskTitleInfo: ClientData<{ id: number, title: string }>;
}

type ClientCaseReducers = {
  setAddedClientTask: (state: ClientState, action: { payload: ClientData<Task> }) => void;
  setDeletedClientTaskId: (state: ClientState, action: { payload: ClientData<number> }) => void;
  setChangeTaskStatus: (state: ClientState, action: { payload: ClientData<{ id: number, completed: boolean }> }) => void;
  setChangeTaskTitle: (state: ClientState, action: { payload: ClientData<{ id: number, title: string }> }) => void;
}

const clientSlice = createSlice<ClientState, ClientCaseReducers, 'client'>({
  name: 'client',
  initialState: {
    task: {
      status: 'ready',
      value: {
        id: -1,
        userId: -1,
        title: '',
        completed: false,
      } as Task,
    },
    deletedTaskId: {
      status: 'ready',
      value: -1,
    },
    taskStatusInfo: {
      status: 'ready',
      value: {
        id: -1,
        completed: false,
      },
    },
    taskTitleInfo: {
      status: 'ready',
      value: {
        id: -1,
        title: '',
      },
    }
  },
  reducers: {
    setAddedClientTask: (state, action) => {
      state.task = action.payload;
    },
    setDeletedClientTaskId: (state, action) => {
      state.deletedTaskId = action.payload;
    },
    setChangeTaskStatus: (state, action) => {
      state.taskStatusInfo = action.payload;
    },
    setChangeTaskTitle: (state, action) => {
      state.taskTitleInfo = action.payload;
    }
  }
});

export const {
  setAddedClientTask,
  setChangeTaskStatus,
  setChangeTaskTitle,
  setDeletedClientTaskId,
} = clientSlice.actions;

export const clientReducer = clientSlice.reducer;

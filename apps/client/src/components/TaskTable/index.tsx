import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {
  Task,
} from '../../types';
import useStyles from './styles';
import TaskTableRow from './TableRow';

type TaskTableProps = {
  tasks: Task[];
};

const TaskTable = ({
  tasks,
}: TaskTableProps) => {
  const styles = useStyles();

  return (
    <>
      <TableContainer className={styles.container} component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className={styles.headerTitle} align="left">Статус</TableCell>
              <TableCell className={styles.headerTitle} align="left">Пользователь</TableCell>
              <TableCell className={styles.headerTitle} align="left">Название</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TaskTableRow
                task={task}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskTable;

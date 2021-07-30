import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

import { User } from '../User';

export type TaskAttributes = {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

export type TaskCreationAttributes = Omit<TaskAttributes, 'id'>;

@Table
export class Task extends Model<TaskAttributes, TaskCreationAttributes> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    title!: string;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    completed!: boolean;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    userId!: number;

    @BelongsTo(() => User)
    user!: User;
}

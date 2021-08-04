import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript';

export type UserAttributes = {
    id: number;
    name: string;
}

export type UserCreationAttributes = Omit<UserAttributes, 'id'>;

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;
}

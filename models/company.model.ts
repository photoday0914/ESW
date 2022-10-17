import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DataType,
} from "sequelize-typescript";

@Table
export class Company extends Model {
    @Column
    name: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    ismarked: boolean;

    @CreatedAt
    creationDate: Date;

    @UpdatedAt
    updatedOn: Date;
}

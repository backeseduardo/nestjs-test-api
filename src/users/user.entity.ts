import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100})
  name: string;

  @Column('int')
  age: number;

  @Column({
    name: 'is_deleted',
    default: false,
  })
  isDeleted: boolean;
}

import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
} from 'typeorm';

import { User } from '../../users/entities';

@Entity()
export class LazerPayKey extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  lazerPayKeyId: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  secretKey: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  publicKey: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.lazerPayKey)
  user: User;
}

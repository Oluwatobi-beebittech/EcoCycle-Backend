import { EcoChampion } from '@Utilities';
import * as bcrypt from 'bcrypt';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { LazerPayKey } from '../../lazerPayKey/entities';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: EcoChampion,
    default: EcoChampion.ECO_COLLECTOR,
  })
  ecoChampion: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  @OneToOne(() => LazerPayKey)
  @JoinColumn()
  lazerPayKey: LazerPayKey;
}

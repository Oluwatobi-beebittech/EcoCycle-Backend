import {
  Entity,
  Column,
  CreateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum EcoChampion {
  ECO_PROCESSOR = 'ECO_PROCESSOR',
  ECO_COLLATOR = 'ECO_COLLATOR',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  userId: number;

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
    default: EcoChampion.ECO_COLLATOR,
  })
  ecoChampion: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AutoMap } from '@nartc/automapper';

@Entity()
export class User {
    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column()
    firstName: string;

    @AutoMap()
    @Column()
    lastName: string;

    @AutoMap()
    @Column({ unique: true })
    email: string;

    @AutoMap()
    @Column()
    dob: Date;

    @AutoMap()
    @Column()
    address: string;

    @AutoMap()
    @Column({ default: false })
    isActive: boolean;

    @AutoMap()
    @Column()
    createdDate: Date;

    @AutoMap()
    @Column({ default: null })
    updatedDate?: Date;
}

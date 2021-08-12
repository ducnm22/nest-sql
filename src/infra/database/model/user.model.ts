import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AutoMap } from '@nartc/automapper';

@Entity()
export class User {
    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @AutoMap()
    @Column({ default: '' })
    firstName: string;

    @AutoMap()
    @Column({ default: '' })
    lastName: string;

    @AutoMap()
    @Column({ unique: true })
    email: string;

    @AutoMap()
    @Column({ default: null })
    dob: Date;

    @AutoMap()
    @Column({ default: '' })
    address: string;

    @AutoMap()
    @Column({ default: false })
    isActive: boolean;

    @AutoMap()
    @Column({ default: null })
    hashedPassword: string;

    @AutoMap()
    @Column()
    createdDate: Date = new Date();

    @AutoMap()
    @Column({ default: null })
    updatedDate?: Date;
}

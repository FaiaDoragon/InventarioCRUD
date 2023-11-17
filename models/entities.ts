import { Entity, BaseEntity , PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('Productos')
export class Producto extends BaseEntity {

    @PrimaryGeneratedColumn()
    ID: number = 0;

    @Column({ type: 'boolean', default: true })
    ESTADO: boolean = true;

    @Column({ type: 'varchar', length: 255 })
    NOMBRE: string = '';

    @Column({ type: 'varchar', length: 255 })
    MARCA: string = '';

    @Column({ type: 'varchar', length: 255 })
    IMG: string = '';

    @Column({ type: 'float'})
    PRECIO: number = 0;

    @Column({ type: 'int' })
    STOCK: number = 0;

    @Column({ type: 'varchar', length: 255 })
    TALLA: string = '';

    @Column({ type: 'varchar', length: 255 })
    COLOR: string = '';

    @CreateDateColumn()
    createdAt: Date = new Date();

    @UpdateDateColumn()
    updatedAt: Date = new Date();
}

@Entity('Admin')
export class Admin extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    ID: number = 0;

    @Column({ type: 'boolean', default: true })
    ESTADO: boolean = true;

    @Column({ type: "varchar", length: 255 })
    NOMBRE: string = '';

    @Column({ type: "varchar", length: 255 })
    APELLIDO: string = '';

    @Column({ type: "int" })
    EDAD: number = 0;

    @Column({ type: 'varchar', length: 255 })
    USUARIO: string = '';

    @Column({ type : 'varchar', length: 255 })
    PASSWORD: string = ''
}

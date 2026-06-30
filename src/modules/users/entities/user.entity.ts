import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn } from "typeorm";

@Entity('usuarios')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ length: 150, unique: true })
    email: string;

    @Column({ length: 255 })
    password: string;

    @Column({
        type: 'enum',
        enum: ['ADMIN', 'ALMACEN', 'VENDEDOR'],
        default: 'VENDEDOR'
    })
    rol: string;

    @OneToMany(() => MovimientoInventario, (movimiento) => movimiento.usuario)
    movimientos: MovimientoInventario[];

    @OneToMany(() => Venta, (venta) => venta.usuario)
    ventas: Venta[];
}

@Entity('disciplinas')
export class Disciplina {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @OneToMany(() => Producto, (producto) => producto.disciplina)
    productos: Producto[];
}

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nombre: string;

    @OneToMany(() => Producto, (producto) => producto.categoria)
    productos: Producto[];
}

@Entity('productos')
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    sku: string;

    @Column({ length: 150 })
    nombre: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_venta: number;

    @Column({ type: 'int', default: 0 })
    stock_actual: number;

    @Column({ type: 'int', default: 5 })
    stock_minimo: number;

    @ManyToOne(() => Disciplina, (disciplina) => disciplina.productos, { eager: true })
    disciplina: Disciplina;

    @ManyToOne(() => Categoria, (categoria) => categoria.productos, { eager: true })
    categoria: Categoria;

    @OneToMany(() => MovimientoInventario, (movimiento) => movimiento.producto)
    movimientos: MovimientoInventario[];

    @OneToMany(() => DetalleVenta, (detalle) => detalle.producto)
    detallesVenta: DetalleVenta[];
}

@Entity('movimientos_inventario')
export class MovimientoInventario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ['ENTRADA', 'SALIDA', 'AJUSTE']
    })
    tipo_movimiento: string;

    @Column({ type: 'int' })
    cantidad: number;

    @Column({ type: 'text' })
    motivo: string;

    @CreateDateColumn({ type: 'timestamp' })
    fecha_registro: Date;

    @ManyToOne(() => Producto, (producto) => producto.movimientos)
    producto: Producto;

    @ManyToOne(() => User, (usuario) => usuario.movimientos)
    usuario: User;
}

@Entity('ventas')
export class Venta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20, unique: true })
    folio: string;

    @CreateDateColumn({ type: 'timestamp' })
    fecha_venta: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @ManyToOne(() => User, (usuario) => usuario.ventas)
    usuario: User;

    @OneToMany(() => DetalleVenta, (detalle) => detalle.venta, { cascade: true })
    detalles: DetalleVenta[];
}

@Entity('detalles_venta')
export class DetalleVenta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    cantidad: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_unitario: number;

    @ManyToOne(() => Venta, (venta) => venta.detalles, { onDelete: 'CASCADE' })
    venta: Venta;

    @ManyToOne(() => Producto, (producto) => producto.detallesVenta)
    producto: Producto;
}
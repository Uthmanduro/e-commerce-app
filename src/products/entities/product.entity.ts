import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 5, default: 0 })
  price: number;

  @Column('text', { default: 'no-image.png' })
  image: string;

  @Column('simple-json', {
    default: {},
    comment: 'key-value pair that represents the product specs',
  })
  specs: Record<string, string>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];
}

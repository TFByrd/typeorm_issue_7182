import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  DeleteDateColumn,
  JoinTable,
} from 'typeorm'
import { Category } from './Category'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @DeleteDateColumn()
  deletedAt: Date

  @ManyToMany((type) => Category, (Category) => Category.posts, {
    cascade: true,
  })
  @JoinTable({ name: 'post_category' })
  categories: Category[]
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  DeleteDateColumn,
} from 'typeorm'
import { Post } from './Post'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @DeleteDateColumn()
  deletedAt: Date

  @ManyToMany((type) => Post, (Post) => Post.categories, {
    onDelete: 'CASCADE',
  })
  posts: Post[]
}

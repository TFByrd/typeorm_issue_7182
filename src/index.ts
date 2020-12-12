import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Post } from './entity/Post'
import { Category } from './entity/Category'

createConnection()
  .then(async (connection) => {
    console.log('Inserting a new Post into the database...')
    let post = new Post()
    post = await connection.manager.save(post)
    console.log('Saved a new post with id: ' + post.id)

    console.log('Inserting a new Category into the database...')
    let category = new Category()
    category.posts = [post]
    category = await connection.manager.save(category)
    console.log('Saved a new category with id: ' + category.id)

    console.log('Soft Deleting category')
    await connection.manager.softRemove(category)
    const categories = await connection.manager.find(Category)
    console.log('Loaded categories: ', categories)

    console.log('Fetching Post with relations')
    post = await connection.manager.findOne(Post, {
      relations: ['categories'],
      where: { id: post.id },
    })
    console.log('Soft deleting Post with relations')
    await connection.manager.softRemove(post)
  })
  .catch((error) => console.log(error))

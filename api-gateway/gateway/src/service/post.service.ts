import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  private posts: any[] = [
    {
      id: 1,
      title: 'post1',
      vote: 10,
    },
    {
      id: 2,
      title: 'post2',
      vote: 20,
    },
  ];
  findOneById(id) {
    return this.posts.find((post) => post.id == id);
  }
  findAll() {
    return this.posts;
  }
}

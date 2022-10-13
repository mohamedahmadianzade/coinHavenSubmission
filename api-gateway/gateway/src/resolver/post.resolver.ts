import { Injectable } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Post } from '../model/post.model';
import { PostsService } from '../service/post.service';
@Resolver((of) => Post)
export class PostResolver {
  constructor(private postService: PostsService) {}


  @Query((returns) => Post,{name:"findByIdPost"})
  async findByIdPost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOneById(id);
  }

  @Query((returns) => [Post],{name:"findAllPost"})
  async findAllPost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findAll();
  }
 
 
}

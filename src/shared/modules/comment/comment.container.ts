import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CommentService } from './comment-service.interface.js';
import { DefaultCommentService } from './default-comment.service.js';
import { Component } from '../../types/component.enum.js';
import { CommentEntity, CommentModel } from './comment.entity.js';

export function createCommentContainer() {
  const container = new Container();
  container.bind<CommentService>(Component.CommentService).to(DefaultCommentService);
  container.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return container;
}

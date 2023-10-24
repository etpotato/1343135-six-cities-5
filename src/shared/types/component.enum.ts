export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel'),
  OfferController: Symbol.for('OfferController'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  UserController: Symbol.for('UserController'),
  CommentService: Symbol.for('CommentService'),
  CommentModel: Symbol.for('CommentModel'),
  FavoriteService: Symbol.for('FavoriteService'),
  FavoriteModel: Symbol.for('FavoriteModel'),
  FavoriteController: Symbol.for('FavoriteController'),
  ExceptionFilter: Symbol.for('ExceptionFilter')
} as const;

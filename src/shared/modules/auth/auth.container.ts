import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { DefaultAuthService } from './default-auth.service.js';
import { AuthExceptionFilter } from './auth.exception-filter.js';

export function createAuthContainer() {
  const authContainer = new Container();

  authContainer.bind(Component.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}

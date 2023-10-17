import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const session = request.session;
    console.log('current user session', session);
    const loggedUserId = session.userId;

    return session.userId;
  },
);

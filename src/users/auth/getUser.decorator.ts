import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRoles } from 'src/database/schema/columns.helpers';

export interface AuthUser {
  id: number;
  role: UserRoles;
  email: string;
  companyId: number;
  firstName: string;
  lastName: string;
}

export const GetUser = createParamDecorator(
  (data: keyof AuthUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: AuthUser = request.user;

    return data ? user?.[data] : user;
  },
);

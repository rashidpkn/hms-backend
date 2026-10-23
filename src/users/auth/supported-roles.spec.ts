import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { UserRoles, UserStatus } from '../../database/schema/columns.helpers';
import { User } from '../../database/schema/users.schema';
import { RegisterUserDto } from '../dto/register.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

const supported = ['MANAGER', 'DOCTOR', 'PHARMACIST', 'LAB_TECHNICIAN'];
const removed = ['ADMIN', 'RECEPTIONIST', 'BILLING', 'NURSE'];

describe('Supported roles', () => {
  it('allows exactly the four supported roles during registration', () => {
    expect(Object.values(UserRoles)).toEqual(supported);
    for (const role of [...supported, ...removed]) {
      const dto = plainToInstance(RegisterUserDto, { role });
      const roleErrors = validateSync(dto).filter(error => error.property === 'role');
      expect(roleErrors.length).toBe(supported.includes(role) ? 0 : 1);
    }
  });

  it.each([...supported, ...removed])('checks %s in access tokens', async role => {
    const jwt = { verifyAsync: jest.fn().mockResolvedValue({ role }) };
    const request = { headers: { authorization: 'Bearer test-token' } };
    const context = {
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;
    const result = new AuthGuard(jwt as unknown as JwtService).canActivate(context);
    if (supported.includes(role)) await expect(result).resolves.toBe(true);
    else await expect(result).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it.each(removed)('rejects legacy %s accounts at login and refresh', async role => {
    const user = { id: 1, role, status: UserStatus.ACTIVE, isDeleted: false };
    const users = { findOne: jest.fn().mockReturnValue({ exec: async () => user }) };
    const jwt = { verifyAsync: jest.fn().mockResolvedValue({ id: 1 }), signAsync: jest.fn() };
    const service = new AuthService(
      users as unknown as Model<User>, jwt as unknown as JwtService,
    );
    await expect(service.login({ email: 'legacy@example.com', password: 'test' }))
      .rejects.toBeInstanceOf(UnauthorizedException);
    await expect(service.refreshToken({ refreshToken: 'test-token' }))
      .rejects.toBeInstanceOf(UnauthorizedException);
    expect(jwt.signAsync).not.toHaveBeenCalled();
  });
});

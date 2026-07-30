import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { JwtModule } from '@nestjs/jwt';
import { AppointmentsModule } from './appointments/appointments.module';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
@Module({
  imports: [
    TerminusModule,
    LoggerModule.forRoot({
      pinoHttp: {
        customSuccessMessage: (req, res, responseTime) =>
          `${req.method} ${req.url} ${res.statusCode} (${responseTime}ms)`,
        customErrorMessage: (req, res, err) =>
          `${req.method} ${req.url} ${res.statusCode} - ${err.message}`,
        serializers: {
          req: (req) => ({
            id: req.id,
            method: req.method,
            url: req.url,
          }),
          res: (res) => ({
            statusCode: res.statusCode,
          }),
        },
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  singleLine: true,
                  ignore: 'pid,hostname,req,res,responseTime',
                },
              }
            : undefined,
      },
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    DatabaseModule,
    CompaniesModule,
    UsersModule,
    PatientsModule,
    JwtModule.register({ global: true }),
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {APP_GUARD} from '@nestjs/core';
import {JwtAuthGuard} from './auth/jwt-auth.guard';

@Module({
  imports: [
    // MongooseModule.forRoot(
    //   'mongodb+srv://viethoangkxtb:VcZQEK0TSFv6epN1@cluster0.zuo5n.mongodb.net/',
    // ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}

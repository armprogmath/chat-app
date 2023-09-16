import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthMiddleware } from './middleware/auth.middleware';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/model/user.entity';
import { RoomEntity } from './chat/model/room/room.entity';
import { MessageEntity } from './chat/model/message/message.entity';
import { JoinedRoomEntity } from './chat/model/joined-room/joined-room.entity';
import { ConnectedUserEntity } from './chat/model/connected-user/connected-user.entity';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [UserEntity, RoomEntity, MessageEntity, JoinedRoomEntity, ConnectedUserEntity],
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule,
    AuthModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/users', method: RequestMethod.POST},
        { path: '/users/login', method: RequestMethod.POST }
      )
      .forRoutes('*')
  }
}


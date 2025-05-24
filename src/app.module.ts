import { Module } from '@nestjs/common';
import { MusicModule } from './music/music.module';
import { AuthModule } from './music/auth/auth.model';
import { PrismaModule } from './music/prisma/prisma.module';
import { KafkaModule } from './kafka/kafka.module';
import { AuthGuard, KeycloakConnectModule, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { keycloakConfig } from './music/auth/keycloak.config';
import { APP_GUARD } from '@nestjs/core';



@Module({
  imports: [MusicModule,
            AuthModule,
            PrismaModule,
            KafkaModule,
            KeycloakConnectModule.register(keycloakConfig),
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  
    {
      provide: APP_GUARD,
      useClass: RoleGuard, 
    },
  ],

})
export class AppModule {}

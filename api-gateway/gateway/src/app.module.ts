import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserResolver } from './user/resolver/user.resolver';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthResolver } from './auth/resolver/auth.resolver';

@Module({
  imports: [
    UserModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
  ],
  providers: [UserResolver, AuthResolver],
})
export class AppModule {}

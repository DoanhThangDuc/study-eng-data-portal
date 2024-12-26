import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { UserModule } from "./domains/User/User.module";
import { AppController } from "./app.controller";
import { LoggingMiddleware } from "./middlewares/LoggingMiddleware";

@Module({
  controllers: [AppController],
  imports: [UserModule, InfrastructureModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}

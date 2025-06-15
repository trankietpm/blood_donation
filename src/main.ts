import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bật CORS cho mọi domain (phát triển)
  app.enableCors();

  // Hoặc cấu hình chi tiết:
  // app.enableCors({
  //   origin: 'http://localhost:3000', // Đúng port FE của bạn
  //   credentials: true,
  // });

  await app.listen(process.env.PORT ?? 3123);
}
bootstrap();

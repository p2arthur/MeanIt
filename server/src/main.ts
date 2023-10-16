import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    credentials: true, // Allow credentials (cookies)
  });
  // app.use(cookieSession({ keys: ['b30ak6v42w0'] }));

  await app.listen(3000);
}
bootstrap();

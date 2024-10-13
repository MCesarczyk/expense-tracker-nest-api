import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port} 🚀`);
  });
}

bootstrap();

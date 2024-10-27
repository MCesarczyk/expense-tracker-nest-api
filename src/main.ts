import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';

const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix, {
    exclude: ['/'],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle(`Expense Tracker REST API`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document, {
    jsonDocumentUrl: 'api/v1/swagger.json',
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Expense tracker API listening on port ${port} 🚀`);
  });
}

bootstrap();

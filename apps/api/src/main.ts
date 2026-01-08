import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })

  // Swagger/OpenAPI Configuration
  const config = new DocumentBuilder()
    .setTitle('StoreToStove API')
    .setDescription(
      'AI-powered recipe planning and shopping list management API'
    )
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('health', 'Health check endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth'
    )
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'StoreToStove API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  })

  const port = process.env.PORT || 3001
  await app.listen(port)
  console.log(`API running on http://localhost:${port}`)
  console.log(`📚 Swagger docs available at http://localhost:${port}/api/docs`)
}

bootstrap()

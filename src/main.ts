import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from '@/middleware/logger.middleware';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { LoggerInterceptor } from './interceptor/logger.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(LoggerMiddleware); 用拦截器代替中间件
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggerInterceptor(), new ResponseInterceptor());
  await app.listen(3000);
}
bootstrap();

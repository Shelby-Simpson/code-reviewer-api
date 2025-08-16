import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewController } from './review/review.controller';
import { OpenAIService } from './openai/openai.service';

@Module({
  imports: [],
  controllers: [AppController, ReviewController],
  providers: [AppService, OpenAIService],
})
export class AppModule {}

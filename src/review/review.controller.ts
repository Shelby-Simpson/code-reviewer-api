import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post()
  async review(@Body() body: { code: string }) {
    const { code } = body;
    const review = await this.openAIService.reviewCode(code);
    return { review };
  }
}

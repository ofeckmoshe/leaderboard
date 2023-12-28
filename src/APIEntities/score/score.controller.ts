import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ScoreService } from './score.service';
import { UpdateScoreDTO } from './DTOs/UpdateScoreDTO';

@Controller('scores')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  
}

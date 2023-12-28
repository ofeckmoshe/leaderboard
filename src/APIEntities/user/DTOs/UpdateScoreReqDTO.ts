import { ApiProperty } from "@nestjs/swagger";

export class UpdateScoreReqDTO {
    @ApiProperty({ example: 10, description: "New score" })
    readonly score: number;
  }
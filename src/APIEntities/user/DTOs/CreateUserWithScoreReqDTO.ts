import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserWithScoreReqDTO {
  @ApiProperty({ example: "newUser", description: "Name of the user" })
  readonly name: string;

  @ApiProperty({ example: "newImage", description: "Image of the user" })
  readonly imageUrl: string;

  @ApiProperty({ example: 10, description: "Initial score of the user" })
  @IsNumber()
  readonly score?: number;
}

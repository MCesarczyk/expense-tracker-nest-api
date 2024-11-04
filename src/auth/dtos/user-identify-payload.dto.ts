import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { UserIdentfyPayload } from "src/auth/entities/user-identify-payload.entity";

export class UserIdentifyPayloadDto implements UserIdentfyPayload {
  @ApiProperty({
    type: String,
    example: `janusznosacz@example.com`,
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
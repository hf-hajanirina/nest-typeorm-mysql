import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'HAJANIRINA',
    description: 'The firstname of the user',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Florent',
    description: 'The lastname of the user',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional({
    description: 'The user is active or not',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

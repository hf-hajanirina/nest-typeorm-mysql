import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'HAJANIRINA',
    description: 'The firstname of the user',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Florent',
    description: 'The lastname of the user',
  })
  @Column()
  lastName: string;

  @ApiPropertyOptional({
    description: 'The user is active or not',
  })
  @Column({ default: true })
  isActive: boolean;
}

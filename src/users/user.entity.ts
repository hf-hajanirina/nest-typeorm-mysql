import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'HAJANIRINA',
    description: 'The firstname of the user',
    required: true,
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Florent',
    description: 'The lastname of the user',
    required: true,
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'harimisaflorent.mi@gmail.com',
    description: 'The email address of the user',
    required: true,
  })
  @Column()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
    required: true,
  })
  @Column()
  password: string;

  @ApiPropertyOptional({
    description: 'The user is active or not',
  })
  @Column({ default: true })
  isActive: boolean;
}

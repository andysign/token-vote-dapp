import { ApiProperty } from '@nestjs/swagger';

export class MintTokenDto {
  @ApiProperty({
    description: 'Mint one MTK for the user or for self if user is 0x0.',
    type: String,
    required: true,
    default: '0x0000000000000000000000000000000000000000',
  })
  address: string;
}

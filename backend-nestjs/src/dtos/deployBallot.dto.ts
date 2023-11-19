import { ApiProperty } from '@nestjs/swagger';

export class DeployBallotDto {
  @ApiProperty({
    description: 'Deploy the TokenizedBallot contract.',
    isArray: true,
    default: ['Proposal1', 'Proposal2'],
    type: [String],
  })
  proposalsArr: string[];
}

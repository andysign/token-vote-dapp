import { Controller, Get, Query } from '@nestjs/common';
// import { Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
// import { MintTokenDto } from './dtos/mintToken.dto';
// import { ApiProperty } from '@nestjs/swagger';

// export class MintTokenDto {
//   @ApiProperty({
//     type: String, required: true,
//     default:
//     '0x0000000000000000000000000000000000000000'
//   })
//   address: string;
// }

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello() {
    // : Promise<string>
    return this.appService.getHello();
  }

  @Get('/block-number')
  async getBlockNumber() {
    return this.appService.getBlockNumber();
  }

  @Get('/contract-address')
  getContractAddress() {
    return { result: this.appService.getContractAddress() };
  }

  @Get('/contract-abi')
  getContractAbi() {
    return { result: this.appService.getContractAbi() };
  }

  @Get('/token-name')
  async getTokenName() {
    return { result: await this.appService.getTokenName() };
  }

  @Get('/total-supply')
  async getTotalSupply() {
    return { result: await this.appService.getTotalSupply() };
  }

  @Get('/check-minter-role')
  async checkMinterRole(@Query('address') address: string) {
    return { result: await this.appService.checkMinterRole(address) };
  }

  // @Post('mint-tokens')
  // async mintTokens(@Body() body: MintTokenDto) {
  //   return { result: await this.appService.mintTokens(body.address) };
  // }
}

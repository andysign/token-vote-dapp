import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiQuery } from '@nestjs/swagger';
import { MintTokenDto } from './dtos/mintToken.dto';
// import { ApiProperty } from '@nestjs/swagger';

// export class MintTokenDto {
//   @ApiProperty({
//     type: String, required: true,
//     default:
//     '0x0000000000000000000000000000000000000000'
//   })
//   address: string;
// }

const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello() {
    return this.appService.getHello();
  }

  @Get('/block-number') // : Promise<string>
  async getBlockNumber() {
    return { result: await this.appService.getBlockNumber() };
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

  @Get('/contract-creator-address')
  getContractCreatorAddress() {
    return { result: this.appService.getContractCreatorAddress() };
  }

  @Get('/contract-creator-address-balance')
  async getContractCreatorAddressBalance() {
    return { result: await this.appService.getContractCreatorAddressBalance() };
  }

  @Get('/check-minter-role')
  @ApiQuery({ name: 'address', type: String, required: false })
  async checkMinterRole(@Query('address') address: string = ADDRESS_ZERO) {
    return { result: await this.appService.checkMinterRole(address) };
  }

  @Post('/mint-tokens')
  async mintTokens(@Body() body: MintTokenDto) {
    return { result: await this.appService.mintTokens(body.address) };
  }
}

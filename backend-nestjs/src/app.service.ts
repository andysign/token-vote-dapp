import { Injectable } from '@nestjs/common';

import { ethers } from 'ethers';

import * as tokenJson from './assets/MyToken.json';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private ctAddr: any;
  private ctAbi: any;
  private prvKey: any;

  private provider: ethers.Provider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;

  constructor(private configService: ConfigService) {
    this.ctAddr = this.configService.get<string>('TOKEN_ADDRESS', '');
    this.ctAbi = tokenJson.abi;
    this.prvKey = process.env['PRIVATE_KEY'];

    this.provider = new ethers.JsonRpcProvider(process.env['RPC_ENDPOINT_URL']);
    this.wallet = new ethers.Wallet(this.prvKey, this.provider);
    this.contract = new ethers.Contract(this.ctAddr, this.ctAbi, this.wallet);
  }

  getHello() {
    return `Backend App Running OK. Go to .../api/ for more!`;
  }

  async getBlockNumber() {
    const { provider } = this;
    const blkNum = await provider.getBlockNumber();
    return blkNum;
  }

  getContractAddress() {
    const { ctAddr } = this;
    return ctAddr;
  }

  getContractAbi() {
    return this.ctAbi;
  }

  async getTokenName(): Promise<string> {
    const { contract } = this;
    const name = await contract.name();
    return name;
  }

  async getTotalSupply() {
    const { contract } = this;
    const totalSupplyBN = await contract.totalSupply();
    const totalSupply = totalSupplyBN.toString();
    return totalSupply;
  }

  getServerWalletAddress() {
    const addr = this.wallet.address;
    return addr;
  }

  async checkMinterRole(addr: string) {
    const { contract } = this;
    const addrFinal = addr || this.wallet.getAddress();
    const { keccak256, toUtf8Bytes } = ethers;
    const roleUtf8 = toUtf8Bytes('MINTER_ROLE');
    const roleHash = keccak256(roleUtf8);
    const minterRole = roleHash; // '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
    const hasRole = await contract.hasRole(minterRole, addrFinal);
    return hasRole;
  }

  // async mintTokens(body) {
  //   const { contract } = this;
  //   const { address } = body;
  //   const amountBN = BigInt(1 * 10 ** 18);
  //   const amount = amountBN.toString();
  //   const tx = await contract.mint(address, amount);
  //   await tx.await();
  //   return tx;
  // }
}

/*
import { Injectable } from '@nestjs/common';

import { ethers } from 'ethers';

import * as tokenJson from './assets/MyToken.json'

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  static config: AppService;
  constructor(private configService: ConfigService) {
    AppService.config = this;
  }

  private get contractAddress(): string {
    return this.configService.get('TOKEN_ADDRESS', '');
  }

  private get privateKey(): string {
    return this.configService.get('PRIVATE_KEY', '');
  }

  private get rpcEndpointUrl(): string {
    return this.configService.get('RPC_ENDPOINT_URL', '');
  }

  private get provider() {
    const rpcEndUrl = AppService.config.rpcEndpointUrl;
    return new ethers.JsonRpcProvider(rpcEndUrl);
  }

  private get contractAbi() {
    return tokenJson.abi;
  }

  getHello() { // : Promise<string>
    return `Hello There!`;
  }

  async getBlockNumber() {
    const provider = AppService.config.provider;
    const blockNumber = await provider.getBlockNumber();
    return blockNumber;
  }

  getContractAddress() {
    const ctAddr = AppService.config.contractAddress;
    return ctAddr;
  }

  getContractAbi() {
    return AppService.config.contractAbi;
  }

  async getTokenName() {
    const provider = AppService.config.provider;
    const abi = AppService.config.contractAbi;
    const addr = AppService.config.contractAddress;
    const contract = new ethers.Contract(addr, abi, provider);
    const name = await contract.name();
    return name;
  }

}
*/

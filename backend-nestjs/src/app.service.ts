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
    this.ctAddr = this.configService.get<string>(
      'TOKEN_ADDRESS',
      process.env.TOKEN_ADDRESS,
    );
    this.ctAbi = tokenJson.abi;
    this.prvKey = this.configService.get<string>(
      'PRIVATE_KEY',
      process.env.PRIVATE_KEY,
    );
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>(
        'RPC_ENDPOINT_URL',
        process.env.RPC_ENDPOINT_URL,
      ),
    );
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

  getContractCreatorAddress() {
    const addr = this.wallet.address;
    return addr;
  }

  async getContractCreatorAddressBalance() {
    const { provider, wallet } = this;
    const addr = wallet.address;
    const balBN = await provider.getBalance(addr);
    const bal = balBN.toString();
    return bal;
  }

  async checkMinterRole(a: string) {
    const { contract } = this;
    const { ZeroAddress: zeroAddress } = ethers;
    const addrFinal = a !== zeroAddress ? a : await this.wallet.getAddress();
    const { keccak256, toUtf8Bytes } = ethers;
    const roleUtf8 = toUtf8Bytes('MINTER_ROLE');
    const roleHash = keccak256(roleUtf8);
    // role 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6
    const minterRole = roleHash;
    const hasRole = await contract.hasRole(minterRole, addrFinal);
    return hasRole;
  }

  async mintTokens(a: string) {
    const { contract } = this;
    const { ZeroAddress: zeroAddress } = ethers;
    const address = a !== zeroAddress ? a : await this.wallet.getAddress();
    const amountBN = BigInt(1 * 10 ** 18);
    const amount = amountBN.toString();
    const tx = await contract.mint(address, amount);
    await tx.wait();
    return tx;
  }
}

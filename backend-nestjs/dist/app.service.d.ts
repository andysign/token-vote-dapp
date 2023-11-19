import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private configService;
    private ctAddr;
    private ctAbi;
    private prvKey;
    private provider;
    private wallet;
    private contract;
    private ctbAddr;
    private ctbAbi;
    constructor(configService: ConfigService);
    getHello(): string;
    getBlockNumber(): Promise<number>;
    getContractAddress(): any;
    getContractAbi(): any;
    getTokenName(): Promise<string>;
    getTotalSupply(): Promise<any>;
    getContractCreatorAddress(): string;
    getContractCreatorAddressBalance(): Promise<string>;
    checkMinterRole(a: string): Promise<any>;
    mintTokens(a: string): Promise<any>;
    deployBallot(proposalsArr: string[]): Promise<{
        deploymentTx: string;
        contractAddress: string | ethers.Addressable;
    }>;
    getContractBallotAddress(): any;
    getContractBallotAbi(): any;
}

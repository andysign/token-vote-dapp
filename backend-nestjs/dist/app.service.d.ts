import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private configService;
    private ctAddr;
    private ctAbi;
    private prvKey;
    private provider;
    private wallet;
    private contract;
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
}

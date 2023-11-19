import { AppService } from './app.service';
import { MintTokenDto } from './dtos/mintToken.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getBlockNumber(): Promise<{
        result: number;
    }>;
    getContractAddress(): {
        result: any;
    };
    getContractAbi(): {
        result: any;
    };
    getTokenName(): Promise<{
        result: string;
    }>;
    getTotalSupply(): Promise<{
        result: any;
    }>;
    getContractCreatorAddress(): {
        result: string;
    };
    getContractCreatorAddressBalance(): Promise<{
        result: string;
    }>;
    checkMinterRole(address?: string): Promise<{
        result: any;
    }>;
    mintTokens(body: MintTokenDto): Promise<{
        result: any;
    }>;
    deploy(): Promise<{
        result: string;
    }>;
}

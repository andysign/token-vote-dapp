import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getBlockNumber(): Promise<number>;
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
    checkMinterRole(address: string): Promise<{
        result: any;
    }>;
}

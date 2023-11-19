"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const tokenJson = require("./assets/MyToken.json");
const ballotJson = require("./assets/TokenizedBallot.json");
const fs = require("fs");
const config_1 = require("@nestjs/config");
let AppService = class AppService {
    constructor(configService) {
        this.configService = configService;
        this.ctAddr = this.configService.get('TOKEN_ADDRESS', process.env.TOKEN_ADDRESS);
        this.ctAbi = tokenJson.abi;
        this.prvKey = this.configService.get('PRIVATE_KEY', process.env.PRIVATE_KEY);
        this.provider = new ethers_1.ethers.JsonRpcProvider(this.configService.get('RPC_ENDPOINT_URL', process.env.RPC_ENDPOINT_URL));
        this.wallet = new ethers_1.ethers.Wallet(this.prvKey, this.provider);
        this.contract = new ethers_1.ethers.Contract(this.ctAddr, this.ctAbi, this.wallet);
        this.ctbAddr = fs
            .readFileSync(`./.env.deployed`)
            .toString()
            .split('=')[1]
            .trim();
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
    async getTokenName() {
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
    async checkMinterRole(a) {
        const { contract } = this;
        const { ZeroAddress: zeroAddress } = ethers_1.ethers;
        const addrFinal = a !== zeroAddress ? a : await this.wallet.getAddress();
        const { keccak256, toUtf8Bytes } = ethers_1.ethers;
        const roleUtf8 = toUtf8Bytes('MINTER_ROLE');
        const roleHash = keccak256(roleUtf8);
        const minterRole = roleHash;
        const hasRole = await contract.hasRole(minterRole, addrFinal);
        return hasRole;
    }
    async mintTokens(a) {
        const { contract } = this;
        const { ZeroAddress: zeroAddress } = ethers_1.ethers;
        const address = a !== zeroAddress ? a : await this.wallet.getAddress();
        const amountBN = BigInt(1 * 10 ** 18);
        const amount = amountBN.toString();
        const tx = await contract.mint(address, amount);
        await tx.wait();
        return tx;
    }
    async deployBallot(proposalsArr) {
        const { wallet: wlt, provider, ctAddr: tokenAddr } = this;
        const { bytecode, abi } = ballotJson;
        const proposalsStr = proposalsArr?.length ? proposalsArr : ['P1', 'P2'];
        const proposals = proposalsStr.map(ethers_1.ethers.encodeBytes32String);
        const blockNum = (await provider.getBlockNumber()) || 1;
        const tokenizedBallotFactory = new ethers_1.ethers.ContractFactory(abi, bytecode, wlt);
        const tokenizedBallot = await tokenizedBallotFactory.deploy(proposals, tokenAddr, blockNum);
        await tokenizedBallot.waitForDeployment();
        const ballotAddr = tokenizedBallot.target;
        const depTx = tokenizedBallot.deploymentTransaction();
        const str = 'CTB_ADDRESS=' + ballotAddr;
        fs.writeFileSync(`./.env.deployed`, str);
        return { deploymentTx: depTx.hash, contractAddress: ballotAddr };
    }
    getContractBallotAddress() {
        const a = fs.readFileSync(`.env.deployed`).toString().split('=')[1].trim();
        this.ctbAddr = a;
        return this.ctbAddr;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppService);
//# sourceMappingURL=app.service.js.map
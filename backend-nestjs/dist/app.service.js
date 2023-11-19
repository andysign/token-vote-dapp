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
    async deployTokenizedBallot() {
        const { wallet: wlt } = this;
        const data = '0x608060405234801561001057600080fd5b506040' +
            '5161012e38038061012e8339818101604052604081' +
            '101561003357600080fd5b81019080805190602001' +
            '909291908051906020019092919050505081600160' +
            '006101000a81548173ffffffffffffffffffffffff' +
            'ffffffffffffffff021916908373ffffffffffffff' +
            'ffffffffffffffffffffffffff1602179055508060' +
            '008190555050506088806100a66000396000f3fe60' +
            '80604052348015600f57600080fd5b506004361060' +
            '285760003560e01c80633fa4f24514602d575b6000' +
            '80fd5b60336049565b604051808281526020019150' +
            '5060405180910390f35b6000805490509056fea264' +
            '6970667358221220926465385af0e8706644e1ff3d' +
            'b7161af699dc063beaadd55405f2ccd6478d756473' +
            '6f6c63430007040033000000000000000000000000' +
            '5555763613a12d8f3e73be831dff8598089d3dca00' +
            '000000000000000000000000000000000000000000' +
            '0000000000000000002a';
        const abi = [
            'constructor(address owner, uint256 initialValue)',
            'function value() view returns (uint)',
        ];
        const contractFactory = new ethers_1.ethers.ContractFactory(abi, data, wlt);
        const tx = await contractFactory.deploy('0x0000000000000000000000000000000000000001', 42);
        await tx.waitForDeployment();
        const ctAddress = await tx.getAddress();
        return ctAddress;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppService);
//# sourceMappingURL=app.service.js.map
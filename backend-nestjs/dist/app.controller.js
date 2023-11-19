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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const swagger_1 = require("@nestjs/swagger");
const mintToken_dto_1 = require("./dtos/mintToken.dto");
const deployBallot_dto_1 = require("./dtos/deployBallot.dto");
const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async getBlockNumber() {
        return { result: await this.appService.getBlockNumber() };
    }
    getContractAddress() {
        return { result: this.appService.getContractAddress() };
    }
    getContractAbi() {
        return { result: this.appService.getContractAbi() };
    }
    async getTokenName() {
        return { result: await this.appService.getTokenName() };
    }
    async getTotalSupply() {
        return { result: await this.appService.getTotalSupply() };
    }
    getContractCreatorAddress() {
        return { result: this.appService.getContractCreatorAddress() };
    }
    async getContractCreatorAddressBalance() {
        return { result: await this.appService.getContractCreatorAddressBalance() };
    }
    async checkMinterRole(address = ADDRESS_ZERO) {
        return { result: await this.appService.checkMinterRole(address) };
    }
    async mintTokens(body) {
        return { result: await this.appService.mintTokens(body.address) };
    }
    async deployBallot(body) {
        return { result: await this.appService.deployBallot(body?.proposalsArr) };
    }
    getContractBallotAddress() {
        return { result: this.appService.getContractBallotAddress() };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/block-number'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getBlockNumber", null);
__decorate([
    (0, common_1.Get)('/contract-address'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getContractAddress", null);
__decorate([
    (0, common_1.Get)('/contract-abi'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getContractAbi", null);
__decorate([
    (0, common_1.Get)('/token-name'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getTokenName", null);
__decorate([
    (0, common_1.Get)('/total-supply'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getTotalSupply", null);
__decorate([
    (0, common_1.Get)('/contract-creator-address'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getContractCreatorAddress", null);
__decorate([
    (0, common_1.Get)('/contract-creator-address-balance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getContractCreatorAddressBalance", null);
__decorate([
    (0, common_1.Get)('/check-minter-role'),
    (0, swagger_1.ApiQuery)({ name: 'address', type: String, required: false }),
    __param(0, (0, common_1.Query)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "checkMinterRole", null);
__decorate([
    (0, common_1.Post)('/mint-tokens'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mintToken_dto_1.MintTokenDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "mintTokens", null);
__decorate([
    (0, common_1.Post)('/deploy-ballot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deployBallot_dto_1.DeployBallotDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deployBallot", null);
__decorate([
    (0, common_1.Get)('/contract-ballot-address'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getContractBallotAddress", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map
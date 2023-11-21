import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      // evmVersion: "shanghai",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

export default config;

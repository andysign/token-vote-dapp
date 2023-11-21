// RUN: npx ts-node scripts/01-deploy-my-token.ts # OR npx hardhat run ... --network localhost
import { ethers } from "hardhat" // Important
import { JsonRpcProvider, Wallet, EtherscanProvider, PocketProvider, AlchemyProvider } from "ethers"

import { HardhatEthersProvider } from "@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider"

import { MyToken__factory } from "../typechain-types"

import * as dotenv from "dotenv" // Misc
import * as envfile from "envfile"
import * as fs from "fs"

dotenv.configDotenv({ path: './.env' })
// const PROPOSALS_DEFAULT = [`Proposal 1`, `Proposal 2`]
// let PROPOSALS = []
// if (process.argv.slice(2).length < 1) {
//   PROPOSALS = PROPOSALS_DEFAULT
//   console.log(`Using DEFAULTS`)
// } else {
//   PROPOSALS = process.argv.slice(2)
// }
// const proposals = PROPOSALS.map((e) => ethers.encodeBytes32String(e))
const LOCALHOST_RPC_URL = process.env.LOCALHOST_RPC_URL ?? ``
const LOCALHOST_URL = LOCALHOST_RPC_URL
const RPC_POKT_ENDPOINT = process.env.RPC_POKT_ENDPOINT ?? ``
const POCKET_URL = RPC_POKT_ENDPOINT
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY ?? ``
const ALCHEMY_KEY = ALCHEMY_API_KEY
const INFURA_API_KEY = process.env.INFURA_API_KEY ?? ``
const INFURA_KEY = INFURA_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY ?? ``
const ETHERSCAN_KEY = ETHERSCAN_API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY ?? ``
const PK = PRIVATE_KEY
const PRIVATE_KEY_LOCALHOST = process.env.PRIVATE_KEY_LOCALHOST ?? ``
const PK_LOCAL = PRIVATE_KEY_LOCALHOST

function saveToSecondaryEnv(parsedEnvObj: { [key: string]: string }) { // HelperFn
  // parsedEnvObj.CT_ADDRESS = `0x5fbdb2315678afecb367f032d93f642f64180aa3`
  const parsedEnvStr = envfile.stringify(parsedEnvObj)
  fs.writeFileSync(`./.env-deployed`, parsedEnvStr)
}

async function testProvider( // HelperFunctionForProviderRelated
  prov: JsonRpcProvider | HardhatEthersProvider | PocketProvider | AlchemyProvider | EtherscanProvider
) {
  const blockNumber = await prov.getBlockNumber()
  const network = await prov.getNetwork()
  const chainId = network.chainId // To Do: Test Fall Back Provider?
  console.log(`Currently at blockNum: ${blockNumber}`)
  console.log(`Currently on selected net w/ chainId: ${chainId}`)
  return Number(chainId)
}

async function testWallet( // HelperFunctionForWlt
  wlt: Wallet,
  prov: JsonRpcProvider | HardhatEthersProvider | PocketProvider | AlchemyProvider | EtherscanProvider
) {
  const txIndex = await wlt.getNonce()
  const balBN = await prov.getBalance(wlt.address)
  const bal = Number(ethers.formatUnits(balBN))
  console.log(`Wallet balance ${bal} ETH`)
  console.log(`Signing tx w/ index aka N.O.N.C.E. ${txIndex}`)
  console.log(`Done`)
}

async function main() {
  const provider = new ethers.JsonRpcProvider(LOCALHOST_URL)
  // const provider = new ethers.AlchemyProvider('sepolia', ALCHEMY_KEY)
  // const provider = new ethers.JsonRpcProvider(POCKET_URL)
  // const provider = new ethers.PocketProvider('goerli', POCKET_URL!.split('/').pop()) // Does not work
  // const provider = new ethers.InfuraProvider('sepolia', INFURA_KEY)
  // const provider = new ethers.EtherscanProvider('sepolia', ETHERSCAN_KEY)

  const chainId = await testProvider(provider)

  const wallet = new ethers.Wallet(chainId == 31337 ? PK_LOCAL : PK, provider)

  await testWallet(wallet, provider)

  const contractFactory = new MyToken__factory(wallet)
  const contract = await contractFactory.deploy()
  await contract.waitForDeployment()
  const contractAddress = await contract.getAddress()
  console.log(`Token contract deployed at ${contractAddress}\n`)

  saveToSecondaryEnv({ CT_ADDRESS: contractAddress })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

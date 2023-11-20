import { RequestTokens } from "./RequestTokens";
import { SelfDelegate } from "./SelfDelegate";
import { TokenAddressFromApi } from "./TokenAddressFromApi";
import { useAccount, useContractRead } from "wagmi";

interface TokenBalanceComponent {
  isLoading: boolean;
  isError: boolean;
  balance: number | bigint;
}

export const TokenInfo = () => {
  const { address } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
    abi: [
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            name: "balance",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "balanceOf",
    args: [address],
  });

  const balance = typeof data === "number" || typeof data === "bigint" ? data : 0;
  const hasBalance = balance !== 0;

  return (
    <>
      <div className="card  bg-primary text-primary-content mt-4">
        <div className="card-body">
          <h2 className="card-title">MyToken Infos : </h2>
          <TokenName></TokenName>
          <TokenBalance isLoading={isLoading} isError={isError} balance={balance}></TokenBalance>
          <TokenAddressFromApi></TokenAddressFromApi>
          <RequestTokens address={address as `0x${string}`}></RequestTokens>
        </div>
      </div>

      <div className="card  bg-primary text-primary-content mt-4">
        <div className="card-body">
          <SelfDelegate address={address as `0x${string}`} canSelfDelegate={hasBalance} />
        </div>
      </div>
    </>
  );
};

function TokenName() {
  const { data, isError, isLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
    abi: [
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
          {
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "name",
  });

  const name = typeof data === "string" ? data : 0;

  if (isLoading) return <div>Fetching name…</div>;
  if (isError) return <div>Error fetching name</div>;
  return <div>Token name: {name}</div>;
}

function TokenBalance({ isLoading, isError, balance }: TokenBalanceComponent) {
  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching token balance. Pls connect wlt!</div>;
  return <div>Balance (MTK): {balance.toString()}</div>;
}

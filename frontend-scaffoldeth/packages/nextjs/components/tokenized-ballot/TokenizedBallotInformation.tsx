import { TokenizedBallotInfo } from "./TokenizedBallotPage";
import { TokenizedBallotVote } from "./TokenizedBallotVote";
import { useAccount, useContractRead } from "wagmi";

interface TokenizedBallotInformationComponent {
  tokenizedBallot: TokenizedBallotInfo;
  tokenizedBallotAbi: Array<any>;
}

export const TokenizedBallotInformation = ({
  tokenizedBallot,
  tokenizedBallotAbi,
}: TokenizedBallotInformationComponent) => {
  const { address } = useAccount();

  // fetch balance
  const { data: balanceUser } = useContractRead({
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

  // fetch hasVoted
  const { data: hasVoted } = useContractRead({
    address: tokenizedBallot.address, // could use NEXT_PUBLIC_BALLOT_ADDRESS in dev mode
    abi: tokenizedBallotAbi,
    functionName: "hasAlreadyVoted",
    args: [address],
  });
  // fetch self delegate
  const { data: votingPower } = useContractRead({
    address: tokenizedBallot.address,
    abi: tokenizedBallotAbi,
    functionName: "votingPower",
    args: [address],
  });

  const balance = typeof balanceUser === "number" || typeof balanceUser === "bigint" ? balanceUser : 0;
  const hasBalance = balance !== 0;

  const votingPowerDigit = typeof votingPower === "number" || typeof balanceUser === "bigint" ? balanceUser : 0;
  const hasVotingPower = votingPowerDigit !== 0;

  return (
    <>
      <div className="card bg-primary text-primary-content mt-4">
        <div className="card-body">
          <h2 className="card-title">Tokenized Ballot Infos : </h2>
          <div>Name : {tokenizedBallot.name}</div>
          <div>Address : {tokenizedBallot.address}</div>
        </div>
      </div>

      <div style={{ margin: "5rem" }}>
        <h2 className="block text-4xl font-bold text-center">VOTE ACCESS</h2>

        <div className="text-center m-4">
          {!hasBalance && (
            <div className="text-error"> You cannot access the vote yet, you dont have enough tokens</div>
          )}
          {hasVoted && <div className="text-error"> You cannot access the vote, you have already voted</div>}
          {!hasVotingPower && (
            <div className="text-error"> You cannot access the vote, you need to self delegate before</div>
          )}

          {hasBalance && !hasVoted && hasVotingPower && <TokenizedBallotVote />}
        </div>
      </div>
    </>
  );
};

import { DEFAULT_PROPOSALS } from "./DeployCard";
import { TokenizedBallotVote } from "./TokenizedBallotVote";
import { TokenizedBallotWinner } from "./TokenizedBallotWinner";
// import { TokenizedBallotInfo } from "./TokenizedBallotPage";
import { useAccount, useContractRead } from "wagmi";

// import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

export const TokenizedBallotCard = ({ tokenizedBallot, tokenizedBallotAbi }: any) => {
  const { data: votingPower } = useContractRead({
    address: tokenizedBallot.address,
    abi: tokenizedBallotAbi,
    functionName: "votingPower",
    args: [useAccount().address],
  });
  const power = (!votingPower ? 0n : BigInt(Number(votingPower))) / BigInt(1 * 10 ** 18); //BigInt(Number(Number.isNaN(votingPower) ? 0 : votingPower)) / BigInt(1*10**18);

  return (
    <>
      <div className="card bg-secondary text-primary-content mt-4">
        <div className="card-body p-0">
          <h3 className="card-title text-center m-0">
            <p className="text-xs">Vote {tokenizedBallot?.address}</p>
          </h3>
          <h3 className="card-title m-0">
            <p className="text-center">
              Power
              <span className="text-xs">{power?.toString() == "0" ? "Zero" : power?.toString()} MTK Power</span>
            </p>
          </h3>
          <h3 className="card-title m-0">
            <p className="text-center">{power?.toString() == "0" && "You do not have the power to vote"}</p>
          </h3>
        </div>
        <div className="card-body">
          <ul className="text-center text-sm">
            <div>
              <b>Voting_Options:</b>
            </div>
            {DEFAULT_PROPOSALS.map((proposal, index) => (
              <li className="p-0" key={index} style={{ display: "flex" }}>
                <p className="m-0">
                  <code>{index}</code> - {proposal}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {tokenizedBallot?.address && (
        <>
          <TokenizedBallotVote
            tokenizedBallot={tokenizedBallot}
            tokenizedBallotAbi={tokenizedBallotAbi}
            votingPower={votingPower}
          />
        </>
      )}
      <br />
      <TokenizedBallotWinner tokenizedBallot={tokenizedBallot} tokenizedBallotAbi={tokenizedBallotAbi} />
    </>
  );
};

/*
interface TokenizedBallotInformationComponent {
  tokenizedBallot: TokenizedBallotInfo;
  tokenizedBallotAbi: Array<any>;
}

export const TokenizedBallotCard = ({
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
*/

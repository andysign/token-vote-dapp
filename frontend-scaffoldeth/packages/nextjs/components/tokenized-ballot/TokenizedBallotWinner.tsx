import { useContractRead, useContractWrite } from "wagmi";

export const TokenizedBallotWinner = ({tokenizedBallot, tokenizedBallotAbi}: any) => {
  const { data } = useContractRead({
    address: tokenizedBallot.address,
    abi: tokenizedBallotAbi,
    functionName: "winningProposal",
    args: [],
  });

  return(
    <>
      <div className="card bg-secondary text-primary-content mt-4">
        <div className="card-body p-0">
          <h3 className="card-title text-center m-0">
            <p className="text-xs">WinningProposal: {data?.toString() || 'N/A'}</p>
          </h3>
        </div>
      </div>
    </>
  );
}

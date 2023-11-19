import { useEffect, useState } from "react";
import { DeployCard } from "./DeployCard";
import { TokenizedBallotInformation } from "./TokenizedBallotInformation";

export interface TokenizedBallotInfo {
  name: string;
  address: `0x${string}`;
}
export const TokenizedBallotPage = ({}) => {
  const [tokenizedBallot, setTokenizedBallot] = useState<TokenizedBallotInfo>();
  const [tokenizedBallotAbi, setTokenizedBallotAbi] = useState();
  const [isLoading, setLoading] = useState(true);

  const fetchTokenizedBallotInfo = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contract-ballot-address`)
      .then(res => res.json())
      .then(data => {
        if (data && data.result) setTokenizedBallot({ name: "Tokenized Ballot", address: data.result });
        setLoading(false);
      })
      .catch(error => console.log(error));
  };

  const fetchTokenizedBallotAbi = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contract-ballot-abi`)
      .then(res => res.json())
      .then(data => {
        if (data && data.result) setTokenizedBallotAbi(data.result);
        setLoading(false);
      })
      .catch(error => console.log(error));
  };

  const isDeployed = tokenizedBallot?.address ?? false;

  useEffect(() => {
    fetchTokenizedBallotInfo();
    fetchTokenizedBallotAbi();
  }, []);
  if (isLoading || !tokenizedBallot || !tokenizedBallotAbi) return <p>Fetching Tokenized Ballot contract...</p>;
  if (!isDeployed) return <DeployCard />;

  return <TokenizedBallotInformation tokenizedBallot={tokenizedBallot} tokenizedBallotAbi={tokenizedBallotAbi} />;
};

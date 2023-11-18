import { useEffect, useState } from "react";
import { DeployCard } from "./DeployCard";
import { TokenizedBallotInformation } from "./TokenizedBallotInformation";

export const TokenizedBallotPage = ({}) => {
  const [tokenizedBallot, setTokenizedBallot] = useState({ name: "mock", address: "" });
  const [isLoading, setLoading] = useState(false);

  const fetchTokenizedBallotInfo = async () => {
    // await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tokenized-ballot`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setTokenizedBallot(data);
    //     setLoading(false);
    //   });
    setTokenizedBallot({ name: "", address: "" });
    setLoading(false);
  };

  const isDeployed = tokenizedBallot.address ?? false;

  useEffect(() => {
    fetchTokenizedBallotInfo();
  }, []);
  if (isLoading) return <p>Fetching Tokenized Ballot contract...</p>;
  if (!isDeployed) return <DeployCard />;
  return <TokenizedBallotInformation tokenizedBallot={tokenizedBallot} />;
};

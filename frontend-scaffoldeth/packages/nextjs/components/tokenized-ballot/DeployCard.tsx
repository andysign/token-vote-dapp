import { useEffect, useState } from "react";

const THRESHOLD = process.env.NEXT_PUBLIC_THRESHOLD ? Number(process.env.NEXT_PUBLIC_THRESHOLD) : 100;

export const DEFAULT_PROPOSALS = ["Ocean's Eleven", "Eleven Ensemble", "Team 0xb", "The Eleventh Hour", "Decem + Unus"];

export const DeployCard = ({}) => {
  const [totalSupply, setTotalSupply] = useState("");
  const [isLoading, setLoading] = useState(false);

  const fetchTotalSupply = async () => {
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/total-supply`)
      .then(res => res.json())
      .then(data => {
        setTotalSupply(data.result);
        setLoading(false);
      });
  };

  const canDeploy = totalSupply ? Number(totalSupply) > THRESHOLD : false;

  console.log(THRESHOLD);
  const deployTokenized = async () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deploy-tokenized`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proposalsArr: DEFAULT_PROPOSALS }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // trigger refresh ?
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchTotalSupply();
  }, []);
  if (isLoading) return <p>Fetching total supply ...</p>;

  return (
    <div className="card  bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">
          <p className="text-center">Total supply : {totalSupply} MTK</p>
        </h2>
        {canDeploy ? (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <button className="btn btn-active btn-neutral" onClick={deployTokenized}>
              Deploy Tokenized Ballot
            </button>
            <p>Default proposals for the new Team name are : </p>
            {DEFAULT_PROPOSALS.map((proposal, i) => (
              <div key={i}>{proposal}</div>
            ))}
          </div>
        ) : (
          <div>You cannot deploy Tokenized Ballot yet, total supply is inferior to the minimum requested </div>
        )}
      </div>
    </div>
  );
};

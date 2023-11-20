import { useEffect, useState } from "react";

const THRESHOLD = process.env.NEXT_PUBLIC_THRESHOLD ? Number(process.env.NEXT_PUBLIC_THRESHOLD) : 100;

export const DeployCard = ({}) => {
  const [totalSupply, setTotalSupply] = useState("");
  const [isLoading, setLoading] = useState(false);

  const fetchTotalSupply = async () => {
    // await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/total-supply`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setTotalSupply(data);
    //     setLoading(false);
    //   });
    setTotalSupply("1000000");
    setLoading(false);
  };

  const canDeploy = totalSupply ? Number(totalSupply) > THRESHOLD : false;

  console.log(THRESHOLD);
  const deployTokenized = async () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deploy-tokenized`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
          <p className="text-center">total supply : {totalSupply} (this is mocked)</p>
        </h2>
        {canDeploy ? (
          <button className="btn btn-active btn-neutral" onClick={deployTokenized}>
            deploy Tokenized Ballot with default Proposals
          </button>
        ) : (
          <div>You cannot deploy Tokenized Ballot yet, total supply is inferior to the minimum requested </div>
        )}
      </div>
    </div>
  );
};

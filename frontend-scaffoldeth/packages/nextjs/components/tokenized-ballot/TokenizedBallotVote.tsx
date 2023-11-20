import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

// import { useState } from "react";
// import { DEFAULT_PROPOSALS } from "./DeployCard";

export const TokenizedBallotVote = ({ tokenizedBallot, tokenizedBallotAbi, votingPower }: any) => {
  // Declare a new state variable, which we'll call "inputValue"
  const [inputValue, setInputValue] = useState("0");

  const { config } = usePrepareContractWrite({
    address: tokenizedBallot?.address,
    abi: tokenizedBallotAbi,
    functionName: "vote",
    args: [inputValue, votingPower],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <>
      <div className="card bg-primary text-primary-content mt-4">
        <div className="card-body">
          <h3 className="card-title form-horizontal text-center m-0">
            <form onSubmit={e => e.preventDefault()} className="col-sm-2">
              <fieldset>
                <label className="mx-6">Vote Proposal Index:</label>
                <input
                  className="text-info mx-6 p-2"
                  type="number"
                  min={0}
                  max={4}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                />
                <button disabled={!write} className="btn btn-active btn-neutral" onClick={() => write?.()}>
                  Submit
                </button>
              </fieldset>
            </form>
          </h3>
        </div>
        <div className="card-footer text-xs text-warning text-sm">
          <small>
            <code style={{ whiteSpace: "pre-wrap" }}>
              {isLoading && <>Loading..</>}
              {isSuccess && <>Transaction: {JSON.stringify(data)}</>}{" "}
            </code>
          </small>
        </div>
      </div>
    </>
  );
};

/*
export const TokenizedBallotVote = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const onSubmit = async () => {
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proposal: selectedOption }), // WIP
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.result) setMessage(`Success ! you voted for ${selectedOption}`);
        setLoading(false);
        // TODO : handle response from API to refresh ? or to show error message
      })
      .catch(error => setMessage(error));
  };
  return !isLoading ? (
    <form onSubmit={onSubmit}>
      <h3 className="block text-2xl font-bold text-center m-4">Select an option:</h3>

      {DEFAULT_PROPOSALS.map((proposal, index) => (
        <div key={index} style={{ display: "flex" }}>
          <input
            type="radio"
            id={proposal}
            name="dynamicRadio"
            value={proposal}
            checked={selectedOption === proposal}
            onChange={handleOptionChange}
          />
          <label htmlFor={proposal}>{proposal}</label>
        </div>
      ))}
      <button className="btn btn-active btn-neutral" type="submit">
        VOTE
      </button>
    </form>
  ) : (
    <div>{message}</div>
  );
};
*/

import { useState } from "react";
import { DEFAULT_PROPOSALS } from "./DeployCard";

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
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/vote`)
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

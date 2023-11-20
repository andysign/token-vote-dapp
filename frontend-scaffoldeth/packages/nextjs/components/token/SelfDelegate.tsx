import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
// import { useState } from "react";

interface SelfDelegateComponent {
  address: `0x${string}`;
  canSelfDelegate: boolean;
}

export const SelfDelegate = ({address, canSelfDelegate}: SelfDelegateComponent) => {
  const { config } = usePrepareContractWrite({
    address: address,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "delegatee",
            type: "address",
          }
        ],
        name: "delegate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      }
    ],
    functionName: 'delegate',
    args: [useAccount().address],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <>
      <div className="card  bg-primary text-primary-content mt-4">
        <h3 className="card-title">
          <small>Can delegate (hasBalance):</small>
          <span>{canSelfDelegate ? "Yes" : "No"}</span>
        </h3>
        <div className="card-body">
          <form onSubmit={e => { e.preventDefault() }}>
            <fieldset disabled={!canSelfDelegate}>
              <div className="card bg-primary text-primary-content mt-4">
                <button
                  disabled={!write}
                  className="btn btn-active btn-neutral"
                  onClick={() => write?.()}>Self Delegating</button>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="card-footer text-xs text-warning text-sm">
          <small>
            <code style={{whiteSpace: "pre-wrap"}}>
              {isLoading && <>Loading..</>}
              {isSuccess && <>Tx: {JSON.stringify(data)}</>}
              {' '}
            </code>
          </small>
        </div>
      </div>
    </>
  )
}

/*
const SelfDelegate2 = ({ address, canSelfDelegate }: SelfDelegateComponent ) => {
  const [data, setData] = useState<{ result: boolean }>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const body = { address: address };

  if (isLoading) return <p>Self Delegating ...</p>;
  if (!data)
    return (
      <div className="card  bg-primary text-primary-content mt-4">
        <div className="card-body">
          <h2 className="card-title">
            <p className="text-center">Self Delegating</p>
          </h2>
          <button
            disabled={!canSelfDelegate}
            className="btn btn-active btn-neutral"
            onClick={() => {
              setLoading(true);
              fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/self-delegate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              })
                .then(res => res.json())
                .then(data => {
                  setData(data);
                  setLoading(false);
                })
                .catch(error => setError(error));
            }}
          >
            Self Delegating
          </button>
          {!canSelfDelegate && (
            <div className="text-error">You cannot self delegate yet, you dont have enough tokens</div>
          )}
        </div>
      </div>
    );

  return (
    <div>
      <p>Result : {data.result ? "worked" : error}</p>
    </div>
  );
};
*/
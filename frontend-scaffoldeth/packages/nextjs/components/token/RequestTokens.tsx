import { useState } from "react";

export const RequestTokens = (params: { address: string }) => {
  const [data, setData] = useState<{ result: boolean }>();
  const [isLoading, setLoading] = useState(false);

  const body = { to: params.address };

  if (isLoading) return <p>Requesting tokens from API...</p>;
  if (!data)
    return (
      <div className="card  bg-primary text-primary-content mt-4">
        <div className="card-body">
          <h2 className="card-title">
            <p className="text-center">Mint tokens</p>
          </h2>
          <button
            className="btn btn-active btn-neutral"
            onClick={() => {
              setLoading(true);
              fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mint-tokens`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              })
                .then(res => res.json())
                .then(data => {
                  setData(data);
                  setLoading(false);
                });
            }}
          >
            Request 1000000 tokens
          </button>
        </div>
      </div>
    );

  return (
    <div>
      <p>Result from API: {data.result ? "worked" : "failed"}</p>
    </div>
  );
};

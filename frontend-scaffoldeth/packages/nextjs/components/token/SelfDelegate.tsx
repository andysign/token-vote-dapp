import { useState } from "react";

interface SelfDelegateComponent {
  address: `0x${string}`;
  canSelfDelegate: boolean;
}
export const SelfDelegate = ({ address, canSelfDelegate }: SelfDelegateComponent) => {
  const [data, setData] = useState<{ result: boolean }>();
  const [isLoading, setLoading] = useState(false);

  const body = { to: address };

  if (isLoading) return <p>Self Delegating ...</p>;
  if (!data)
    return (
      <div className="card  bg-primary text-primary-content mt-4">
        <div className="card-body">
          <h2 className="card-title">
            <p className="text-center">Self Delegating (only available if user has balance)</p>
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
                });
            }}
          >
            Self Delegating
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

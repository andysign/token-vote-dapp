import { useBalance } from "wagmi";

export const WalletBalance = (params: { address: `0x${string}` }) => {
  const { data, isError, isLoading } = useBalance({
    address: params.address,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <div className="card bg-primary text-primary-content mt-4">
      <div className="card-body">
        My current Balance: {data?.formatted} {data?.symbol}
      </div>
    </div>
  );
};

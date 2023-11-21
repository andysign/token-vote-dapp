import { useEffect, useState } from "react";

export const TokenAddressFromApi = () => {
  const [data, setData] = useState<{ result: string }>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contract-address`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading token address from API...</p>;
  if (!data) return <p>No token address information</p>;

  return (
    <div>
      Token address from API:
      <br />
      <p style={{ fontWeight: "bold" }}>{data.result}</p>
    </div>
  );
};

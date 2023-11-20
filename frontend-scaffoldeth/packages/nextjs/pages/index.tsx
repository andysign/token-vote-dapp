import type { NextPage } from "next";
import { TokenInfo } from "~~/components/token/TokenInfo";
import { TokenizedBallotPage } from "~~/components/tokenized-ballot/TokenizedBallotPage";
import { WalletInfo } from "~~/components/wallet";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Our DApp - Team 11</span>
          </h1>

          <PageBody></PageBody>
        </div>
      </div>
    </>
  );
};

function PageBody() {
  return (
    <>
      <p className="text-center text-lg"> My Wallet information </p>
      <WalletInfo />
      <br /> <TokenInfo />
      <br />
      <TokenizedBallotPage />
    </>
  );
}

export default Home;

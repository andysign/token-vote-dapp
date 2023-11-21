import { TokenizedBallotInfo } from "./TokenizedBallotPage";

export interface TokenizedBallotInformationComponent {
  tokenizedBallot: TokenizedBallotInfo;
  tokenizedBallotAbi: Array<any>;
}

export const TokenizedBallotGeneralInformation = ({
  tokenizedBallot,
  tokenizedBallotAbi,
}: TokenizedBallotInformationComponent) => {
  return (
    <>
      <div className="card bg-primary text-primary-content mt-4">
        <div className="card-body">
          <h2 className="card-title">Tokenized Ballot Infos : </h2>
          <div>Name : {tokenizedBallot.name}</div>
          <div>Address : {tokenizedBallot.address}</div>
          <div>AbiType : {typeof tokenizedBallotAbi}</div>
        </div>
      </div>
    </>
  );
};

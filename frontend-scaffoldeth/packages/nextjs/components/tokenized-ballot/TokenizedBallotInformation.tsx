interface TokenizedBallotInformationComponent {
  tokenizedBallot: any;
}

export const TokenizedBallotInformation = ({ tokenizedBallot }: TokenizedBallotInformationComponent) => {
  return (
    <div className="card  bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Tokenized Ballot Infos : </h2>
        <p>Name : {tokenizedBallot.name}</p>
        <p>Address : {tokenizedBallot.address}</p>
      </div>
    </div>
  );
};

const Card = ({ profile }: { profile: any }) => (
  <div className="rounded shadow-lg w-1/2 m-auto ">
    <div className="font-bold text-xl p-5 text-center">
      <div>{`${profile.first_name} ${profile.last_name}`}</div>
      <p>{`Age: ${profile.age}`}</p>
    </div>
  </div>
);

export default Card;

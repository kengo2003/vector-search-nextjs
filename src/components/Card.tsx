type DataType = {
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  hobbies: string[];
  bio: string;
  occupation: string;
  country_of_origin: string;
  relationship_status: string;
};

type CardProps = {
  profile: DataType;
};

const Card = ({ profile }: CardProps) => (
  <div className="rounded shadow-lg w-1/2 m-auto ">
    <div className="font-bold text-xl p-5 text-center">
      <div>{`${profile.first_name} ${profile.last_name}`}</div>
      <p>{`Age: ${profile.age}`}</p>
    </div>
  </div>
);

export default Card;

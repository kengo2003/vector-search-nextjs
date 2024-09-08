import { CardType } from "@/types/type";
import Image from "next/image";

type CardProps = {
  profile: CardType;
};

const Card = ({ profile }: CardProps) => (
  <div className="rounded shadow-lg w-1/2 m-auto ">
    <Image
      src={profile.image}
      alt={profile.first_name}
      height={1000}
      width={1000}
      className="w-full h-64 object-contain"
    />
    <div className="font-bold text-xl p-5 text-center">
      <div className="p-3 text-3xl">{`${profile.first_name} ${profile.last_name}`}</div>
      <p>{`国: ${profile.country_of_origin}`}</p>
      <p>{`職業: ${profile.occupation}`}</p>
      <p>{`年齢: ${profile.age}`}</p>
    </div>
  </div>
);

export default Card;

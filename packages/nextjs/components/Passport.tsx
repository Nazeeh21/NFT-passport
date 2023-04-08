import Image from "next/image";

const Passport = ({ metadata }: { metadata: string }) => {
  const data = JSON.parse(metadata);
  console.log("metadata", metadata);

  return (
    <div className="border-2 border-black-900 p-2 rounded-md">
      <div className="text-xl">Your Passport</div>
      <img className="w-[200px] rounded-md" src={data.image as string} alt="Passport Image" />
    </div>
  );
};

export default Passport;

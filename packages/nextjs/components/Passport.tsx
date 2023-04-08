/* eslint-disable @next/next/no-img-element */
const Passport = ({ metadata }: { metadata: string }) => {
  const data = JSON.parse(metadata);
  console.log("metadata", metadata);

  return (
    <div className="border-2 border-black-900 p-2 rounded-md">
      <div className="text-xl">Your Passport</div>
      <img className="w-[200px] rounded-md" src={data.image as string} alt="Passport Image" />
      <div> Address: {data.address}</div>
      <div>Date Collected: {data.date}</div>
    </div>
  );
};

export default Passport;

import { useState } from "react";
import { Spinner } from "~~/components/Spinner";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Index = () => {
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");
  const [flag, setFlag] = useState("");

  const {
    writeAsync: createStampAsync,
    isLoading: createStampLoading,
    isSuccess,
  } = useScaffoldContractWrite({
    contractName: "MainContract",
    functionName: "createCountryStamp",
    args: [country, currency, flag],
  });
  return (
    <div className="flex m-5 flex-col gap-2">
      <div className="flex gap-2">
        <label className="text-xl">Country</label>
        <input
          className="text-black w-[10rem] p-2 border-blue-500 rounded-md"
          value={country}
          onChange={e => setCountry(e.target.value)}
          type="text"
        />
      </div>
      <div className="flex gap-2">
        <label className="text-xl">Currency</label>
        <input
          className="text-black w-[10rem] p-2 border-blue-500 rounded-md"
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          type="text"
        />
      </div>
      <div className="flex gap-2">
        <label className="text-xl">Flag</label>
        <input
          className="text-black w-[10rem] p-2 border-blue-500 rounded-md"
          value={flag}
          onChange={e => setFlag(e.target.value)}
          type="text"
        />
      </div>
      {createStampLoading ? (
        <Spinner />
      ) : isSuccess ? (
        <div>Stamp added successfully</div>
      ) : (
        <button className="p-2 border-green-500 border-2 rounded-md" onClick={createStampAsync}>
          Create Stamp
        </button>
      )}
    </div>
  );
};

export default Index;

// india => https://i.ibb.co/rtPHJRL/india.png
// vietnam => https://i.ibb.co/L6tcqGm/vietnam.png

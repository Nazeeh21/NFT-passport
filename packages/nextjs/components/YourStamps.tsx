import Stamp from "./Stamp";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const YourStamps = () => {
  const { address } = useAccount();
  const { data: getStampsCollectedByAddress } = useScaffoldContractRead({
    contractName: "MainContract",
    functionName: "getStampsCollectedByAddress",
    args: [address],
    watch: true,
    cacheTime: 0,
  });

  console.log("getStampsCollectedByAddress", getStampsCollectedByAddress);

  return (
    <div>
      {getStampsCollectedByAddress &&
      // @ts-ignore
        getStampsCollectedByAddress.map((stamp, index) => <Stamp key={index} data={stamp} />)}
    </div>
  );
};

export default YourStamps;

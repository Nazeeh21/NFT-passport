/* eslint-disable @next/next/no-img-element */
import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import CountryStamp from "~~/abis/CountryStamp.json";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

const Stamp = ({ data }: { data: [string, BigNumber] }) => {
  console.log("stamp data", data);

  const { data: stampAddress } = useScaffoldContractRead({
    contractName: "MainContract",
    functionName: "countryStampAddresses",
    args: [data[0]],
  });

  const { data: StampMetaData } = useContractRead({
    chainId: getTargetNetwork().id,
    functionName: "tokenURI",
    address: stampAddress,
    abi: CountryStamp?.abi,
    watch: true,
    args: [BigNumber.from(data[1]).toNumber()],
  });

  console.log("StampMetaData", StampMetaData);
  return (
    <div className="m-2 block w-[20rem]">
      <div className="border-2 border-black-900 p-2 rounded-md">
        <div className="text-xl">{data[0]} stamp</div>
        <img className="w-[200px] rounded-md" src={StampMetaData as string} alt="County Flag" />
        {/* <div> Address: {data.address}</div> */}
        {/* <div>Date Collected: {data.date}</div> */}
      </div>
    </div>
  );
};

export default Stamp;

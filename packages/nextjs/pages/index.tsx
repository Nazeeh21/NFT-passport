import { useState } from "react";
import Head from "next/head";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import { useAccount, useContractRead } from "wagmi";
import PassportABI from "~~/abis/Passport.json";
import Passport from "~~/components/Passport";
import { Spinner } from "~~/components/Spinner";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";
import YourStamps from "~~/components/YourStamps";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { data: passportContract } = useScaffoldContractRead({
    contractName: "MainContract",
    functionName: "passport",
  });

  const { data: userPassportTokenId, refetch: refetchuserPassportTokenId } = useScaffoldContractRead({
    contractName: "MainContract",
    functionName: "userToPassportId",
    args: [address],
    watch: true,
  });

  const { data: userPassportMetadata } = useContractRead({
    chainId: getTargetNetwork().id,
    functionName: "tokenURI",
    address: passportContract,
    abi: PassportABI?.abi,
    watch: true,
    args: [userPassportTokenId],
  });

  console.log("userPassportMetadata", userPassportMetadata);

  const createPassport = async () => {
    // reading the image file
    // Update with the path to your image file
    // const response = await fetch("packages/nextjs/public/assets/passport.jpeg");
    // const blob = await response.blob();
    // const data = await blob.arrayBuffer();
    // const img = await client.add(new Uint8Array(data));
    // const dataToUpload = {
    //   address,
    //   date: new Date(),
    //   // nationality: "indian"
    //   image: "https://i.ibb.co/Bf3w6W2/OIG.jpg",
    // };

    // // console.log("ipfsResult", img.path);
    // setIpfsData(JSON.stringify(dataToUpload));

    await createPassportAsync();
    await refetchuserPassportTokenId();
  };

  const { writeAsync: createPassportAsync, isLoading: createPassportLoading } = useScaffoldContractWrite({
    contractName: "MainContract",
    functionName: "createPassport",
    args: [
      JSON.stringify({
        address,
        date: new Date(),
        // nationality: "indian"
        image: "https://i.ibb.co/Bf3w6W2/OIG.jpg",
      }),
    ],
  });

  const { data: stampForIndia } = useScaffoldContractRead({
    contractName: "MainContract",
    functionName: "userToStamp",
    args: [address, "india"],
  });

  console.log("passportContract", passportContract);
  console.log("userPassport", userPassportTokenId && BigNumber.from(userPassportTokenId).toNumber());
  console.log("stampForIndia", stampForIndia);
  if (!isConnected) {
    return (
      <div className="m-auto">
        <div className="text-2xl">Connect wallet to get started</div>

        <ConnectButton />
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>
      <div className="m-auto">
        {!userPassportMetadata && userPassportTokenId && BigNumber.from(userPassportTokenId).toNumber() === 0 ? (
          <div className="w-full">
            <div className="text-xl">Passport does not exist.</div>
            {createPassportLoading ? (
              <Spinner width="50px" height="50px" />
            ) : (
              <button
                onClick={createPassport}
                className="text-3xl px-4 py-2 hover:bg-[rgba(0,0,0,0)] transition-all duration-300 hover:text-black rounded-md bg-cover bg-[url('https://th.bing.com/th/id/OIG.MOBIH_c9N.8gjGfYHe5S?pid=ImgGn')] bg-[rgba(0,0,0,0.3)] text-white bg-blend-multiply font-bold"
                style={{ backgroundPosition: "50% 43%" }}
              >
                Get Your Passport
              </button>
            )}
          </div>
        ) : (
          <div>{userPassportMetadata && <Passport metadata={userPassportMetadata as string} />}</div>
        )}
      </div>
      <div>
        <YourStamps />
      </div>
    </>
  );
};

export default Home;

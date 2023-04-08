import Head from "next/head";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Spinner } from "~~/components/Spinner";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { data: passportContract } = useScaffoldContractRead({
    contractName: "MainContract",
    functionName: "passport",
  });

  const { data: userPassportTokenId } = useScaffoldContractRead({
    contractName: "MainContract",
    functionName: "userToPassportId",
    args: [address],
  });

  const { data: userPassportMetadata } = useScaffoldContractRead({
    contractName: "Passport",
    functionName: "tokenURI",
    args: [userPassportTokenId],
  });

  const { writeAsync: createPassportAsync, isLoading: createPassportLoading } = useScaffoldContractWrite({
    contractName: "MainContract",
    functionName: "createPassport",
    args: [address],
  });

  const { data: stampForIndia } = useScaffoldContractRead({
    contractName: "MainContract",
    functionName: "userToStamp",
    args: [address, "india"],
  });

  console.log("passportContract", passportContract);
  console.log("userPassport", userPassport && BigNumber.from(userPassport).toNumber());
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
        {userPassport && BigNumber.from(userPassport).toNumber() === 0 ? (
          <div className="w-full">
            <div className="text-xl">Passport does not exist.</div>
            {createPassportLoading ? (
              <Spinner width="50px" height="50px" />
            ) : (
              <button
                onClick={createPassportAsync}
                className="text-3xl px-4 py-2 hover:bg-[rgba(0,0,0,0)] transition-all duration-300 hover:text-black rounded-md bg-cover bg-[url('https://th.bing.com/th/id/OIG.MOBIH_c9N.8gjGfYHe5S?pid=ImgGn')] bg-[rgba(0,0,0,0.3)] text-white bg-blend-multiply font-bold"
                style={{ backgroundPosition: "50% 43%" }}
              >
                Get Your Passport
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="text-xl">Passport exists.</div>
          </div>
        )}
      </div>
      <div></div>
    </>
  );
};

export default Home;

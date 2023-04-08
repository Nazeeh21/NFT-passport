import { create } from "ipfs-http-client";

export const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `testing123`,
  },
});

export const uploadIpfs = async (data: any) => {
  const result = await client.add(JSON.stringify(data));
  console.log("uploadIpfs result: ", result);
  return result;
};

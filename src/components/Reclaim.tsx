"use client";
import { useState } from "react";
import QRCode from "react-qr-code";
import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";
import { Button } from "./ui/button";
import { IconFidgetSpinner } from "@tabler/icons-react";

function ReclaimDemo(props: {
  onVerify: (username: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) {
  const { onVerify, loading, setLoading } = props;
  const APP_ID = "0x7338ACB9905BE467bF7617F55356EA6B5C9b62ec";

  const APP_SECRET = "0x5bf7e985dd379902c11103ebcdf22d22c92b3d0f40acad96aaed7428c70b77e5";
  const PROVIDER_ID = "6d3f6753-7ee6-49ee-a545-62f1b1822ae5";

  // State to store the verification request URL
  const [requestUrl, setRequestUrl] = useState("");
  const [ghUrl, setGhUrl] = useState<string | null>(null);

  const getVerificationReq = async () => {
    // Your credentials from the Reclaim Developer Portal
    // Replace these with your actual credentials

    try {
      setLoading(true);
      // Initialize the Reclaim SDK with your credentials
      const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);

      // Generate the verification request URL
      const requestUrl = await reclaimProofRequest.getRequestUrl();

      console.log("Request URL:", requestUrl);

      setRequestUrl(requestUrl);

      // Start listening for proof submissions
      await reclaimProofRequest.startSession({
        // Called when the user successfully completes the verification
        onSuccess: (proofs) => {
          console.log("Verification success", proofs);
          //@ts-expect-error
          setProofs(proofs);
          setLoading(false);
          const data = {
            identifier: "0x880e3e927372e0baa4b8cb18b6632a56891688feb3a04f34c9179b32f52c8741",
            claimData: {
              provider: "http",
              parameters:
                '{"additionalClientOptions":{},"body":"","geoLocation":"","headers":{"Referer":"https://github.com/settings/profile","Sec-Fetch-Mode":"same-origin","User-Agent":"Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.69 Mobile Safari/537.36"},"method":"GET","paramValues":{"username":"atulbhatt-system32"},"responseMatches":[{"invert":false,"type":"contains","value":"<span class=\\"color-fg-muted\\">({{username}})</span>"}],"responseRedactions":[{"jsonPath":"","regex":"<span\\\\ class=\\"color\\\\-fg\\\\-muted\\">\\\\((.*)\\\\)</span>","xPath":""}],"url":"https://github.com/settings/profile"}',
              owner: "0x6c30063b96cc0fc1ff8e35ea2eab1d1b47109109",
              timestampS: 1733236516,
              context:
                '{"contextAddress":"0x0","contextMessage":"sample context","extractedParameters":{"username":"atulbhatt-system32"},"providerHash":"0x74734677e529e5d823b3a2845799a908ab59d2afa9ac168c6fd5d57d1b0e319f"}',
              identifier: "0x880e3e927372e0baa4b8cb18b6632a56891688feb3a04f34c9179b32f52c8741",
              epoch: 1,
            },
            signatures: [
              "0xe796e8d07fb885b54b3ded833f67b4ecc9ff02c1c5f5bd1221edb6d8a6020884585308849f73f08d5248a3873187fd8438b5e58e94547813e56d6423768347361c",
            ],
            witnesses: [
              {
                id: "0x244897572368eadf65bfbc5aec98d8e5443a9072",
                url: "wss://witness.reclaimprotocol.org/ws",
              },
            ],
            publicData: {},
          };
          const parameters = data.claimData.parameters;
          const username = JSON.parse(parameters).paramValues.username;
          const ghUrl = `https://github.com/${username}`;
          onVerify(ghUrl);
          setGhUrl(ghUrl);

          // Add your success logic here, such as:
          // - Updating UI to show verification success
          // - Storing verification status
          // - Redirecting to another page
        },
        // Called if there's an error during verification
        onError: (error) => {
          console.error("Verification failed", error);

          // Add your error handling logic here, such as:
          // - Showing error message to user
          // - Resetting verification state
          // - Offering retry options
        },
      });
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={getVerificationReq}>
        Add Github
        {loading && <IconFidgetSpinner className="animate-spin" />}
      </Button>

      {/* Display QR code when URL is available */}

      {requestUrl && !ghUrl && (
        <div style={{ margin: "20px 0" }}>
          <QRCode value={requestUrl} />
        </div>
      )}
    </div>
  );
}

export default ReclaimDemo;

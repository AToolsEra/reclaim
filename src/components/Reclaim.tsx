"use client";
import { useState } from "react";
import QRCode from "react-qr-code";
import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";

function ReclaimDemo() {
  const APP_ID = "0x7338acb9905be467bf7617f55356ea6b5c9b62ec";
  const APP_SECRET = "0x5bf7e985dd379902c11103ebcdf22d22c92b3d0f40acad96aaed7428c70b77e5";
  const PROVIDER_ID = "6d3f6753-7ee6-49ee-a545-62f1b1822ae5";

  // State to store the verification request URL
  const [requestUrl, setRequestUrl] = useState("");
  const [proofs, setProofs] = useState([]);

  const getVerificationReq = async () => {
    alert();
    // Your credentials from the Reclaim Developer Portal
    // Replace these with your actual credentials

    try {
      // Initialize the Reclaim SDK with your credentials
      const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);

      // Generate the verification request URL
      const requestUrl = await reclaimProofRequest.getRequestUrl();

      debugger;
      console.log("Request URL:", requestUrl);

      setRequestUrl(requestUrl);

      // Start listening for proof submissions
      await reclaimProofRequest.startSession({
        // Called when the user successfully completes the verification
        onSuccess: (proofs) => {
          console.log("Verification success", proofs);
          //@ts-expect-error
          setProofs(proofs);

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
    <>
      <button onClick={getVerificationReq}>Get Verification Request</button>

      {/* Display QR code when URL is available */}

      {requestUrl && (
        <div style={{ margin: "20px 0" }}>
          <QRCode value={requestUrl} />
        </div>
      )}

      {proofs && (
        <div>
          <h2>Verification Successful!</h2>
          <pre>{JSON.stringify(proofs, null, 2)}</pre>
        </div>
      )}
    </>
  );
}

export default ReclaimDemo;

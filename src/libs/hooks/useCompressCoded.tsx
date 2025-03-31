"use client";

export function useCompressCoded() {
  const onEncode = (data: unknown) => {
    try {
      // Convert the data to a JSON string, encode it to Base64, and then URI-encode it
      return encodeURIComponent(
        Buffer.from(JSON.stringify(data)).toString("base64")
      );
    } catch (error) {
      console.error("Error during encoding:", error);
      return null; // Return null or handle the error appropriately
    }
  };

  const onDecode = (data: unknown) => {
    try {
      // Decode the URI-encoded string, then decode Base64, and parse it as JSON
      const decodedString = Buffer.from(
        decodeURIComponent(data as string),
        "base64"
      ).toString("utf8");
      return JSON.parse(decodedString);
    } catch (error) {
      console.error("Error during decoding:", error, data);
      return null; // Return null or handle the error appropriately
    }
  };

  return {
    onEncode,
    onDecode,
  };
}

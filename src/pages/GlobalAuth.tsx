import { Button, H1, Stack } from "@deskpro/app-sdk";

import { UseGlobalAuth } from "../hooks/UseGlobalAuth";
export const GlobalAuth = () => {
  const { callbackUrl, poll, key, setAccessCode, signIn } = UseGlobalAuth();

  const auth = async (values: any) => {
    if (!callbackUrl || !poll) return;

    window.open(`https://login.microsoftonline.com/${
      values.tenant_id
    }/oauth2/v2.0/authorize?client_id=${
      values.client_id
    }&response_type=code&redirect_uri=${new URL(
      callbackUrl
    )}&response_mode=query
&scope=https%3A%2F%2Fgraph.microsoft.com%2Fmail.read&state=${key}`);

    setAccessCode((await poll()).token);
  };

  return (
    <Stack style={{ width: "100%" }} vertical gap={10}>
      <H1>Authorization URL: {callbackUrl}</H1>
      <Button text="Sign In" onClick={signIn}></Button>
    </Stack>
  );
};

import { v4 as uuidv4 } from "uuid";
import { useMemo, useState } from "react";
import {
  adminGenericProxyFetch,
  useDeskproAppEvents,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { Settings } from "../types/settings";

export const UseGlobalAuth = () => {
  const key = useMemo(() => uuidv4(), []);

  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);
  const [poll, setPoll] = useState<(() => Promise<{ token: string }>) | null>(
    null
  );
  const [settings, setSettings] = useState<Settings | null>(null);
  const [accessCode, setAccessCode] = useState<string | null>(null);

  useDeskproAppEvents(
    {
      onAdminSettingsChange: setSettings,
    },
    []
  );

  useInitialisedDeskproAppClient(
    (client) => {
      (async () => {
        const { callbackUrl, poll } = await client
          .oauth2()
          .getAdminGenericCallbackUrl(
            key,
            /\?code=(?<token>.+?)&/,
            // eslint-disable-next-line no-useless-escape
            /&state=(?<key>[a-f0-9\-]{36})/
          );

        setCallbackUrl(callbackUrl);
        setPoll(() => poll);
      })();
    },
    [key]
  );

  const signIn = async () => {
    if (!callbackUrl || !poll) return;

    window.open(`https://login.microsoftonline.com/${
      settings?.tenant_id
    }/oauth2/v2.0/authorize?client_id=${
      settings?.client_id
    }&response_type=code&redirect_uri=${new URL(
      callbackUrl
    )}&response_mode=query
&scope=https%3A%2F%2Fgraph.microsoft.com%2Fmail.read&state=${key}`);

    setAccessCode((await poll()).token);
  };

  useInitialisedDeskproAppClient(
    (client) => {
      if (
        ![
          accessCode,
          callbackUrl,
          settings?.client_id,
          settings?.tenant_id,
        ].every((e) => e)
      )
        return;

      (async () => {
        const fetch = await adminGenericProxyFetch(client);

        const response = await fetch(
          `https://login.microsoftonline.com/${
            settings?.tenant_id
          }/oauth2/v2.0/token?client_id=${
            settings?.client_id
          }&scope=https%3A%2F%2Fgraph.microsoft.com%2Fmail.read&code=${accessCode}&redirect_uri=${new URL(
            callbackUrl as string
          )}&grant_type=authorization_code`
        );

        const data = await response.json();
        console.log(data);
      })();
    },
    [accessCode, callbackUrl, settings?.client_id, settings?.tenant_id]
  );

  return {
    callbackUrl,
    poll,
    key,
    setAccessCode,
    signIn,
  };
};

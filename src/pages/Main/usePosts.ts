import { proxyFetch, useQueryWithClient } from "@deskpro/app-sdk";
import { QueryKey } from "../../query";
import type { IDeskproClient } from "@deskpro/app-sdk";

export const getPosts = async (client: IDeskproClient) => {
  // Use the apps proxy to fetch data from a third party
  // API @see https://support.deskpro.com/en-US/guides/developers/app-proxy
  const fetch = await proxyFetch(client);
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?userId=1");
  return response.json();
}

export const usePosts = () => useQueryWithClient([QueryKey.POSTS], getPosts);

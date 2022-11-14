import { Stack, H1, H2 } from "@deskpro/app-sdk";

export const ErrorFallback = ({
  error,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <Stack vertical gap={10} role="alert">
      <H1>Something went wrong:</H1>
      <H2>{error.message}</H2>
    </Stack>
  );
};

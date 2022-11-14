import {
  Button,
  H1,
  Stack,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  useInitialisedDeskproAppClient((client) => {
    client.setTitle("Azure DevOps");
  });

  const navigate = useNavigate();

  navigate("/itemmenu");

  return (
    <Stack gap={5} vertical style={{ margin: "5px" }}>
      <H1>Log into your DevOps Account</H1>
      <Button text="Log In"></Button>
    </Stack>
  );
};

import { cleanup } from "@testing-library/react";
import { render } from "../testing";
import { App } from "./App";

jest.mock("./pages/Main/usePosts", () => ({
  usePosts: () => ({
    data: [{ id: 1, title: "first post" }, { id: 2, title: "second post" }],
    isLoading: false,
  }),
}));

describe("useLinkedCards", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render App", async () => {
    const { findByText } = render((
      <App />
    ), { wrappers: { router: true, query: true, appSdk: true } });

    expect(await findByText(/Big Ticket/i)).toBeInTheDocument();
    expect(await findByText(/first post/i)).toBeInTheDocument();
    expect(await findByText(/second post/i)).toBeInTheDocument();
  });
});

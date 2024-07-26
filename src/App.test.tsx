import { cleanup } from "@testing-library/react";
import { render } from "@deskpro/app-testing-utils";
import { App } from "@/App";
import { mockPosts } from "@/testing";

jest.mock("./pages/Main/usePosts", () => ({
  usePosts: () => ({
    data: mockPosts,
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
    expect(await findByText(/sunt aut facere repellat/i)).toBeInTheDocument();
    expect(await findByText(/qui est esse/i)).toBeInTheDocument();
    expect(await findByText(/ea molestias quasi/i)).toBeInTheDocument();
  });
});

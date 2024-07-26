export type TicketData = {
  ticket: {
    id: string,
    subject: string,
    permalinkUrl: string,
  },
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

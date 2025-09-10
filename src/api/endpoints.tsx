export const EP = {
  polls: {
    list: "/polls",               // GET /polls
    detail: (id: string|number) => `/polls/${id}`,        // GET /polls/:id
    vote:   (id: string|number) => `/polls/${id}/vote`,   // POST /polls/:id/vote
  },
};
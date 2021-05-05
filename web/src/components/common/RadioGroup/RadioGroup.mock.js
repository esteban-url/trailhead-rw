export const options = (/* vars, { ctx, req } */) => ({
  options: [
    {
      name: 'Public access',
      description: 'This project would be available to anyone who has the link',
    },
    {
      name: 'Private to Project Members',
      description: 'Only members of this project would be able to access',
    },
    {
      name: 'Private to you',
      description: 'You are the only one able to access this project',
    },
  ],
  lable: 'privacy',
})

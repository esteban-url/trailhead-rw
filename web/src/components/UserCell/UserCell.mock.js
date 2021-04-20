// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  user: {
    id: 'a17a13d1-fa6c-4858-b00c-c333001b6449',
    email: 'estebanjrojas@gmail.com',
    aud: '',
    confirmed_at: new Date(),
    confirmation_sent_at: new Date(),
    recovery_sent_at: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
    user_metadata: { full_name: 'Esteban Rojas' },
    app_metadata: {
      roles: ['admin'],
      created_by: 'estebanrojas@icod.cr',
      lastUpdated_by: 'estebanrojas@icod.cr',
    },
  },
})

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  user: {
    id: 'a17a13d1-fa6c-4858-b00c-c333001b6449',
    email: 'estebanjrojas@gmail.com',
    aud: '',
    confirmed_at: new Date().toISOString(),
    confirmation_sent_at: new Date().toISOString(),
    recovery_sent_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_metadata: { full_name: 'Esteban Rojas' },
    app_metadata: {
      roles: ['admin'],
      created_by: 'estebanrojas@icod.cr',
      lastUpdated_by: 'estebanrojas@icod.cr',
    },
  },
})

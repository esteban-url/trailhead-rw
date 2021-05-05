export const adminUser = (/* vars, { ctx, req } */) => ({
  user: {
    id: 'a17a13d1-fa6c-4858-b00c-c333001b6449',
    email: 'estebanjrojas@gmail.com',
    user_metadata: { full_name: 'Esteban Rojas' },
    app_metadata: { roles: ['admin'] },
  },
})

export const user = (/* vars, { ctx, req } */) => ({
  user: {
    id: 'a17a13d1-fa6c-4858-b00c-c333001b6449',
    email: 'estebanjrojas@gmail.com',
    user_metadata: { full_name: 'Esteban Rojas' },
    app_metadata: { roles: ['user'] },
  },
})
export const userWithErrorSaving = (/* vars, { ctx, req } */) => ({
  user: {
    id: 'a17a13d1-fa6c-4858-b00c-c333001b6449',
    email: 'estebanjroj2@gmail.com',
    user_metadata: { full_name: 'Esteban Rojas' },
    app_metadata: { roles: ['admin'] },
  },
  error: { message: 'The emais has already been registered' },
})
export const loading = (/* vars, { ctx, req } */) => ({
  loading: true,
})

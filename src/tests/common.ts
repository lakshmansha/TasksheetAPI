export const authMethod = async (route: any) => {
  const middleware = route.authMiddleware;

  const userData = {
    _id: '60706478aad6c9ad19a31c84',
    email: 'test@email.com',
    password: 'n48ukl45453knkdjkjgs090454df',
    username: 'test',
  };

  middleware.validateUser = jest.fn().mockReturnValue(userData);
};

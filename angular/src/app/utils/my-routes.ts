export class MyRoutes {
  static protectedRoutes = {
    authLandingPage: '/invoice-builder/main'
  };
  static notProtected = {
    loginPage: '/invoice-builder?login=true'
  };
}

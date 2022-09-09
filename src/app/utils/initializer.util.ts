import {AuthService} from "../shared/services/auth.service";


export class InitializerUtil {
  public static setUpAuthData(authService: AuthService): () => Promise<any> {
    return (): Promise<any> => {
      return new Promise(async (resolve, reject) => {
        try {
          authService.init();
          resolve(null);
        } catch (error) {
          reject(error);
        }
      });
    };
  }
}

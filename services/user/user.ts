import { AxiosInstance, isAxiosError } from "axios";

import { api } from "@/lib/axios";
import { UserType } from "./types";

class UserService {
  private api: AxiosInstance;

  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance;
  }

  public async getMe() {
    const response = await this.api.get<ApiResponse<UserType>>("/user/me");
    return response.data.data;
  }

  //   public async updateUsername(username: string): Promise<ApiResponse<User>> {
  //     try {
  //       const { data } = await this.api.patch<ApiResponse<User>>(
  //         "/user/update-username",
  //         {
  //           username,
  //         }
  //       );
  //       return data;
  //     } catch (error) {
  //       throw this.handleError(error);
  //     }
  //   }
}

export const userService = new UserService(api);

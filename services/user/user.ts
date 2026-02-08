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
}

export const userService = new UserService(api);

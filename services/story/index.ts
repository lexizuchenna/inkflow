import { AxiosInstance } from "axios";
import { api } from "@/lib/axios";
import {
  SaveStoryRequest,
  UploadImageRequest,
  UploadImageResponse,
} from "./types";
import { Story } from "@/entities";

class StoryService {
  private api: AxiosInstance;

  private routes = {
    upload: "/upload",
    save: "/user/stories",
    get: "/user/stories",
    getOne: "/user/stories/:slug",
    updateOne: "/user/stories/:slug",
    deleteOne: "/user/stories/:slug",
  };

  constructor(apiInstance: AxiosInstance) {
    this.api = apiInstance;
  }

  public async uploadImage(data: UploadImageRequest) {
    const response = await this.api.post<ApiResponse<UploadImageResponse>>(
      this.routes.upload,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data.data;
  }

  public async saveStory(data: SaveStoryRequest) {
    const response = await this.api.post<ApiResponse<Story>>(
      this.routes.save,
      data
    );
    return response.data.data;
  }

  public async getStories(page = 1) {
    const response = await this.api.get<ApiResponse<Array<Story>, Pagination>>(
      `${this.routes.get}?page=${page}`
    );
    return { stories: response.data.data, pagination: response.data.meta };
  }

  public async getStory(slug: string) {
    const route = this.routes.getOne.replace(":slug", slug);
    const response = await this.api.get<ApiResponse<Story>>(route);
    return { ...response.data.data };
  }

  public async updateStory(slug: string, data: SaveStoryRequest) {
    const route = this.routes.getOne.replace(":slug", slug);
    const response = await this.api.patch<ApiResponse<Story>>(route, data);
    return { ...response.data.data };
  }

  public async deleteStory(slug: string) {
    const route = this.routes.deleteOne.replace(":slug", slug);
    const { data } = await this.api.delete<ApiResponse<{ slug: string }>>(
      route
    );
    return data.data;
  }
}

export const storyService = new StoryService(api);

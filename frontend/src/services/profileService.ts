import api from "./api";

import type {
  Profile,
  ProfileRequest,
} from "../types/profile";

class ProfileService {
  async getProfile(): Promise<Profile> {
    const { data } =
      await api.get("/profile");

    return data;
  }

  async createProfile(
    profile: ProfileRequest
  ): Promise<Profile> {
    const { data } =
      await api.post(
        "/profile",
        profile
      );

    return data;
  }

  async updateProfile(
    profile: ProfileRequest
  ): Promise<Profile> {
    const { data } =
      await api.put(
        "/profile",
        profile
      );

    return data;
  }
}

export default new ProfileService();
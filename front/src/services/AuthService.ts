/* eslint-disable prettier/prettier */
import api from "../configs/api";
import { ReqLoginDto, ReqRegistryDto, ResLoginDto, ResRegistryDto } from "./dto/auth.dto";

export default class AuthService {
  public static async register(body: ReqRegistryDto): Promise<ResRegistryDto> {
    const response: Response = await fetch(`${api.baseUrl}registry`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      return Promise.reject(response.json());
    }

    return response.json();
  }

  public static async login(body: ReqLoginDto): Promise<ResLoginDto> {
    const response: Response = await fetch(`${api.baseUrl}login`, {
      method: 'POST',
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      return Promise.reject(await response.json());
    }

    return response.json();
  }

  public static async checkAuth(): Promise<ResRegistryDto> {
    const response: Response = await fetch(`${api.baseUrl}users/info/me`, {
      method: 'GET',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access-token')}`
      }
    })
    if (response.status === 401) {
      const resRefresh = await fetch(`${api.baseUrl}refresh`, {
        method: 'GET',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (resRefresh.ok) {
        const { accessToken } = await resRefresh.json();
        localStorage.setItem('access-token', accessToken);
        const newResponse: Response = await fetch(`${api.baseUrl}users/info/me`, {
          method: 'GET',
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        })
        if (!newResponse.ok) {
          return Promise.reject(await newResponse.json());
        }

        return newResponse.json();
      }

      return Promise.reject(await response.json());
    }
    if (!response.ok) {
      return Promise.reject(await response.json());
    }

    return response.json();
  }


  public static async logout(): Promise<{ message: string }> {
    const response: Response = await fetch(`${api.baseUrl}logout`, {
      method: 'GET',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access-token')}`
      }
    })

    if (!response.ok) {
      return Promise.reject(await response.json());
    }

    return response.json();
  }

}

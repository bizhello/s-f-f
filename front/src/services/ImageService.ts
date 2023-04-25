/* eslint-disable prettier/prettier */
import api from "../configs/api";
import { ResCreateImageDto, ResRemoveImageDto } from "./dto/image.dto";

export default class ImageService {
  public static async createImageCard(
    idCard: string,
    formData: FormData,
  ): Promise<ResCreateImageDto> {
    const response = await fetch(`${api.baseUrl}images/${idCard}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access-token')}`
        // "Content-type": "multipart/form-data", // application/json
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    if (!response.ok) {
      return Promise.reject(response.json());
      // throw new Error(`Ошибка: ${response.status}`);
    }

    return response.json();
  }

  public static async removeCardImage(idCard: string): Promise<ResRemoveImageDto> {
    const response = await fetch(`${api.baseUrl}images/${idCard}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('access-token')}`
      },
    })

    if (!response.ok) {
      return Promise.reject(response.json());
    }

    return response.json();
  }

}

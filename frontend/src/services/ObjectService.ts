import $api from "../setup/axios";
import { IObject } from "../models/responce/Object";

export default class ObjectService {
  static getObjects() {
    return $api.get<IObject[]>("/objects");
  }

  static getObject(id: number) {
    return $api.get<IObject>(`/objects/${id}`);
  }

  static addObject(code: string, name: string, comment: string | null) {
    return $api.post<IObject>("/objects", { code, name, comment });
  }

  static updateObject(updatedRecord: IObject) {
    return $api.patch<IObject>(`/objects/${updatedRecord.id}`, updatedRecord);
  }

  static deleteObject(id: number) {
    return $api.delete<IObject>(`/objects/${id}`);
  }
}

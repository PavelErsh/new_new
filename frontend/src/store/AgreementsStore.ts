import { makeAutoObservable, runInAction } from "mobx";
import { IAgreement, IAgreementResponce } from "../models/responce/Agreement";
import AgreementsService from "../services/AgreementService";
import dayjs from "dayjs";

class AgreementsStore {
  data: IAgreementResponce[] = [];

  editingKey = "";
  currentRecord: IAgreementResponce | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAgreements() {
    try {
      const response = await AgreementsService.getAgreements();
      const data = response.data;
      runInAction(() => {
        this.data = data;
      });
    } catch (error) {
      console.error("Ошибка получения доп соглашений:", error);
    }
  }

  async addAgreement(
    name: string,
    number: string,
    price: number,
    deadline: string,
    notes: string | null,
    contract: number
  ) {
    const formattedDeadline = dayjs(deadline).format("YYYY-MM-DD");
    await AgreementsService.addAgreement(
      name,
      number,
      price,
      formattedDeadline,
      notes,
      contract
    );
  }

  async updateAgreement(updatedRecord: IAgreement) {
    try {
      if (updatedRecord.deadline) {
        updatedRecord.deadline = dayjs(updatedRecord.deadline).format(
          "YYYY-MM-DD"
        );
      }
      const response = await AgreementsService.updateAgreement(updatedRecord);
      this.data = this.data.map((item) =>
        item.id === response.data.id ? { ...item, ...response.data } : item
      );
    } catch (error) {
      console.error("Ошибка обновления доп соглашения:", error);
    }
  }

  async removeAgreement(id: number) {
    try {
      await AgreementsService.deleteAgreement(id);
      this.data = this.data.filter((item) => item.id !== id);
    } catch (error) {
      console.error("Ошибка удаления доп соглашения:", error);
    }
  }

  setEditingKey(key: string) {
    this.editingKey = key;
  }

  setCurrentRecord(record: IAgreementResponce) {
    this.currentRecord = record;
  }

  updateRecord(updatedRecord: IAgreementResponce) {
    this.data = this.data.map((item) =>
      item.key === updatedRecord.key ? { ...item, ...updatedRecord } : item
    );
  }
}

const agreementsStore = new AgreementsStore();
export default agreementsStore;

import { makeAutoObservable, runInAction } from "mobx";
import { IContract, IContractResponce } from "../models/responce/Contract";
import ContractService from "../services/ContractService";
import dayjs from "dayjs";

class ContractsStore {
  data: IContractResponce[] = [];

  editingKey = "";
  currentRecord: IContractResponce | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchContracts() {
    try {
      const response = await ContractService.getContracts();
      const data = response.data;
      runInAction(() => {
        this.data = data;
      });
    } catch (error) {
      console.error("Ошибка получения заказчиков:", error);
    }
  }

  async addContract(
    code: number,
    name: string,
    customer: number,
    executor: number,
    number: string,
    price: number,
    theme: string,
    sign_date: string | null | undefined
  ) {
    const formattedSignDate = sign_date ? dayjs(sign_date).format("YYYY-MM-DD") : null;
    await ContractService.addContract(
      code,
      name,
      customer,
      executor,
      number,
      price,
      theme,
      formattedSignDate
    );
  }

  async updateCustomer(updatedRecord: IContract) {
    try {
      if (updatedRecord.sign_date) {
        updatedRecord.sign_date = dayjs(updatedRecord.sign_date).format(
          "YYYY-MM-DD"
        );
      }
      const response = await ContractService.updateContract(updatedRecord);
      this.data = this.data.map((item) =>
        item.id === response.data.id ? { ...item, ...response.data } : item
      );
    } catch (error) {
      console.error("Ошибка обновления заказчика:", error);
    }
  }

  async removeContract(id: number) {
    try {
      await ContractService.deleteContract(id);
      this.data = this.data.filter((item) => item.id !== id);
    } catch (error) {
      console.error("Ошибка удаления заказчика:", error);
    }
  }

  setEditingKey(key: string) {
    this.editingKey = key;
  }

  setCurrentRecord(record: IContractResponce) {
    this.currentRecord = record;
  }

  updateRecord(updatedRecord: IContractResponce) {
    this.data = this.data.map((item) =>
      item.key === updatedRecord.key ? { ...item, ...updatedRecord } : item
    );
  }
}

const contractsStore = new ContractsStore();
export default contractsStore;

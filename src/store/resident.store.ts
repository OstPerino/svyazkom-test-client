import { defineStore } from "pinia";
import { useToast } from "vue-toast-notification";
import { Nullable, Undefinable } from "@/types";
import { ICreateResidentDto, IResident, IUpdateResidentDto } from "@/types/resident.types";
import "vue-toast-notification/dist/theme-sugar.css";
import ResidentService from "@/api/resident.service";

export const useResidentStore = defineStore("resident", {
  state: () => ({
    residents: [] as IResident[],
    currentResident: null as Nullable<IResident>
  }),
  getters: {
    getResidentById() {
      return (id: number) => {
        return this.residents.find(resident => resident.id === id);
      };
    }
  },
  actions: {
    async fetchResidents() {
      try {
        const residents = await ResidentService.getAll();
        this.residents = [...residents];
      } catch (e: unknown) {
        return e;
      }
    },
    async addResident(body: ICreateResidentDto) {
      try {
        await ResidentService.create(body);
        await this.fetchResidents();
      } catch (e: unknown) {
        return e;
      }
    },
    async deleteResident(id: Undefinable<number>) {
      const $toast = useToast();

      try {
        // TODO: MB fix
        if (id !== 0 && !id) {
          return Promise.reject(() => "Id must be valid");
        }

        await ResidentService.delete(id);
        await this.fetchResidents();
      } catch (e: unknown) {
        $toast.error("Неудалось выполнить операцию", {
          position: "top"
        });
        return e;
      }
    },
    async updateResident(id: number, body: IUpdateResidentDto) {
      try {
        await ResidentService.update(body, id);
        await this.fetchResidents();
      } catch (e: unknown) {
        return e;
      }
    },
    async fetchResident(id: number) {
      try {
        const resident = await ResidentService.getById(id);
        this.currentResident = resident;
      } catch (e: unknown) {
        return e;
      }
    },
    setCurrentResident(resident: IResident) {
      this.currentResident = { ...resident };
    }
  }
});

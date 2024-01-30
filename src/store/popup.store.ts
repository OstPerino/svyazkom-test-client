import { defineStore } from "pinia";
import { Nullable } from "@/types";

export enum PopupType {
	addResident = "addResident",
	acceptDelete = "acceptDelete",
	addBill = "addBill",
	changeTariff = "changeTariff",
}

interface IPopupState {
	isVisiblePopup: boolean;
	popupType: Nullable<PopupType>;
}

export const usePopupStore = defineStore("popup", {
  state: (): IPopupState => ({
    isVisiblePopup: false,
    popupType: null,
  }),
  actions: {
    showPopup(type: PopupType) {
      this.isVisiblePopup = true;
      this.popupType = type;
    },
    closePopup() {
      this.isVisiblePopup = false;
    }
  }
});

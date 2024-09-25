import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { IMenuItem } from "./menu.interface";

export const ISAUTHMENU: IMenuItem[] = [
  {
    link: DASHBOARD_PAGES.HOME,
    name: "Главная",
  },
  // {
  //   link: DASHBOARD_PAGES.CREATE,
  //   name: "Создать задачу",
  // },
  // {
  //   link: DASHBOARD_PAGES.TASKS,
  //   name: "Все задачи",
  // },
  {
    link: DASHBOARD_PAGES.PROFILE,
    name: "Профиль",
  },
];
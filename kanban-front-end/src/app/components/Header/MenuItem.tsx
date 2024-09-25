import { IMenuItem } from "./menu.interface";
import Link from "next/link";
export const MenuItem = ({ item }: { item: IMenuItem }) => {
  return (
    <>
      <li>
        <Link href={item.link}>
          <span>{item.name}</span>
        </Link>
      </li>
    </>
  );
};

"use client";

import { MenuItem } from "./MenuItem";
import { ISAUTHMENU } from "./menu.data";
import styles from "./Header.module.sass";
import { LogoutButton } from "./LogoutButton";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Link from "next/link";

export function Header() {
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (accessToken) {
      setHasAccessToken(true);
      setIsLoaded(true);
    } else {
      setHasAccessToken(false);
      setIsLoaded(true);
    }
  }, [cookies]);
  if (!isLoaded)
    return (
      <nav>
        <ul className={styles.menu}></ul>
      </nav>
    );
  return (
    <nav>
      <ul className={styles.menu}>
        {hasAccessToken ? (
          <>
            {ISAUTHMENU.map((item) => (
              <MenuItem item={item} key={item.name} />
            ))}
            <LogoutButton />
          </>
        ) : (
          <Link className="py-1 px-2 rounded-xl bg-green-300" href="/auth">
            <span>Войти</span>
          </Link>
        )}
      </ul>
    </nav>
  );
}
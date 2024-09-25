"use client";

import styles from "./Home.module.sass";
import CheckIcon from "@mui/icons-material/Check";
import { Header } from "./components/Header/Header";
const arr = [
  { value: "Разработка", color: "#00B8D9" },
  { value: "Тестировка", color: "#0052CC" },
  { value: "Менеджмент", color: "#5243AA" },
  { value: "Инфраструктура", color: "#FF5630" },
  { value: "Безопасность", color: "#FF8B00" },
  { value: "Аналитика", color: "#FFC400" },
  { value: "Поддержка", color: "#a7f542" },
  { value: "Дизайн", color: "#36B37E" },
  { value: "Маркетинг", color: "#666666" },
];
// const frontEnd = [
//   {
//     link: "https://www.typescriptlang.org/",
//     src: "/icons/ts.png",
//     name: "TypeScript",
//   },
//   { link: "#", src: "/icons/nextjs.png", name: "NextJs" },
//   { link: "#", src: "/icons/react.png", name: "React" },
//   { link: "#", src: "/icons/material.png", name: "MaterialUI" },
//   { link: "#", src: "/icons/tailwind.png", name: "Tailwind" },
//   { link: "#", src: "/icons/sass.png", name: "Sass" },
// ];
// const backEnd = [
//   {
//     link: "https://www.typescriptlang.org/",
//     src: "/icons/ts.png",
//     name: "TypeScript",
//   },
//   { link: "https://nestjs.com/", src: "/icons/nestjs.png", name: "NestJs" },
//   {
//     link: "https://www.postgresql.org/",
//     src: "/icons/pgsql.png",
//     name: "PostgreSQL",
//   },
//   { link: "https://www.prisma.io/", src: "/icons/prisma.png", name: "Prisma" },
// ];
export function HomePage() {
  return (
    <>
      <Header />
      <h1 className={styles.h1}>Корпоративный портал</h1>
      <p>
        Это тестовый корпоративный портал компании, в котором сотрудники могут
        создавать задачи, испонять их (отчитываться) и оценивать выполненную
        работу.
      </p>
      <p>В качестве примера я выбрал IT компанию и основные её направления:</p>
      <ul className={styles.arr}>
        {arr.map((el, index) => (
          <li
            key={index}
            className={styles.arrLi}
            style={{ border: `solid, 2px, ${el.color}` }}
          >
            {el.value}
          </li>
        ))}
      </ul>
      <p className="my-5">Возможности:</p>
      <ul className={styles.list}>
        <li className={styles.el}>
          <CheckIcon />
          <span>
            Персонализированный доступ: Каждый сотрудник может получить доступ к
            персонализированной информации и задачам в соответствии с его ролью
            и направлением.
          </span>
        </li>
        <li className={styles.el}>
          <CheckIcon />
          <span>
            Управление задачами: Администраторы могут создавать, выполнять и
            отслеживать свои задачи, а также оценивать работу сотрудников.
            Сотридники же могут резервировать, выполнять задачи и писать отчёты
            о выполнении.
          </span>
        </li>
        <li className={styles.el}>
          <CheckIcon />
          <span>
            Система рейтинга: Каждый сотрудник получает оценку от 1 до 5 за
            выполненную задачу.
          </span>
        </li>
      </ul>
      {/* <p>Технологии сайта:</p>
      <div className={styles.stack}>
        <div className={styles.back}>
          <p>Back-end</p>
          <ul>
            {backEnd.map((el, index) => (
              <li>
                {isHovered === index && (
                  <span className={styles.desc}>{el.name}</span>
                )}
                <a
                  href={el.link}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(-1)}
                  className={styles.cart}
                >
                  <img className={styles.img} src={el.src} alt="" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p>Front-end:</p>
          <ul>
            {frontEnd.map((el, index) => (
              <li>
                {isHoveredFront === index && (
                  <span className={styles.desc}>{el.name}</span>
                )}
                <a
                  href={el.link}
                  onMouseEnter={() => setIsHoveredFront(index)}
                  onMouseLeave={() => setIsHoveredFront(-1)}
                  className={styles.cart}
                >
                  <img className={styles.img} src={el.src} alt="" />
                </a>
              </li>
            ))}
          </ul> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

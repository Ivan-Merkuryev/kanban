import { useState } from "react";

import styles from "./Carousel.module.sass";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import cn from "clsx";
export function Carousel({
  slide1,
  slide2,
  arr,
}: {
  slide1: string;
  slide2: string;
  arr: { value: string; color: string }[];
}) {
  const [currentSlide, setCurrentSlide] = useState(1);

  const slideContent = () => {
    return (
      <div className={styles.slide}>
        <p className={styles.slText}>{slide2}</p>

        <div className={styles.arr}>
          {arr.map((el) => (
            <p>{el.value}</p>
          ))}
        </div>
      </div>
    );
  };

  const goToOne = () => {
    setCurrentSlide(1);
  };
  const goToTwo = () => {
    setCurrentSlide(2);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide(currentSlide === 1 ? 2 : 1);
  };

  const goToNextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 1 : 2);
  };

  return (
    <>
      <div className={styles.carousel}>
        <ArrowBackIosIcon className={styles.btn1} onClick={goToPreviousSlide} />
        <div className="flex flex-col justify-center items-center">
          <p className="text-center">
            {currentSlide === 1 ? slide1 : slideContent()}
          </p>
          <div className={styles.radio}>
            <span
              onClick={goToOne}
              className={cn(currentSlide === 1 ? styles.active : styles.r1)}
            ></span>
            <span
              onClick={goToTwo}
              className={cn(currentSlide === 2 ? styles.active : styles.r2)}
            ></span>
          </div>
        </div>
        <ArrowForwardIosIcon className={styles.btn2} onClick={goToNextSlide} />
      </div>
    </>
  );
}

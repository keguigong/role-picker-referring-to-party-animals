import { useEffect, useRef, useState, useCallback } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";
import RoleAvatar from "./role-avatar";
import rolesList from "./roles.json";

export default function RolePicker() {
  const domRef = useRef<HTMLUListElement>(null);
  const conRef = useRef<HTMLDivElement>(null);

  const [moveFlag, setFlag] = useState(false);
  const [startX, setStartX] = useState(0);
  const [left, setLeft] = useState(0);

  const [activeIndex, setActive] = useState(0);
  const [arrowLeft, setArrowLeft] = useState(-1);

  // Mouse events
  const slideCallback = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (domRef.current && conRef.current && moveFlag) {
        const deltaX =
          e instanceof TouchEvent ? e.touches[0].clientX - startX : e.movementX;
        e instanceof TouchEvent && setStartX(e.touches[0].clientX);
        const conWidth = conRef.current.clientWidth;
        const width = domRef.current.scrollWidth;
        const newLeft =
          left + deltaX <= 0
            ? left + deltaX >= conWidth - width
              ? left + deltaX
              : conWidth - width
            : 0;
        domRef.current.style.transform = `translateX(${newLeft}px)`;
        setLeft(newLeft);
      }
    },
    [domRef, conRef, moveFlag, left, startX]
  );

  useEffect(() => {
    const mousedown = () => setFlag(true);
    const mouseup = () => setFlag(false);
    const block = domRef.current;
    block?.addEventListener("mousedown", mousedown);
    window.addEventListener("mousemove", slideCallback);
    window.addEventListener("mouseup", mouseup);

    const touchstart = (e: TouchEvent) => (
      setFlag(true), setStartX(e.touches[0].clientX)
    );
    const touchend = (e: TouchEvent) => setFlag(true);
    block?.addEventListener("touchstart", touchstart);
    window.addEventListener("touchmove", slideCallback);
    window.addEventListener("touchend", touchend);

    return () => {
      block?.removeEventListener("mousedown", mousedown);
      window.removeEventListener("mousemove", slideCallback);
      window.removeEventListener("mouseup", mouseup);

      block?.removeEventListener("touchstart", touchstart);
      window.removeEventListener("touchmove", slideCallback);
      window.removeEventListener("touchend", touchend);
    };
  }, [domRef, slideCallback]);

  // Keyboard events
  const keyCallback = useCallback((e: KeyboardEvent) => {
    const len = rolesList.length * 2;
    if (e.code === "ArrowLeft")
      setActive((prev) => (prev - 1 >= 0 ? prev - 1 : 0)), setArrowLeft(1);
    else if (e.code === "ArrowRight")
      setActive((prev) => (prev + 1 <= len - 1 ? prev + 1 : len - 1)),
        setArrowLeft(-1);
    else return;
  }, []);

  useEffect(() => {
    if (!domRef.current || !conRef.current) return;
    const len = rolesList.length * 2;

    const conWidth = conRef.current.clientWidth;
    const width = domRef.current.scrollWidth;

    const liWidth = (width - 16) / len;
    const liActiveWidth = liWidth + 16;

    const halfConWidth = conWidth / 2;
    const leftWidth = liWidth * activeIndex + liActiveWidth / 2;
    const rightWidth = liWidth * (len - 1 - activeIndex) + liActiveWidth / 2;

    // console.log(activeIndex, liWidth, leftWidth, halfConWidth);

    if (leftWidth >= halfConWidth && rightWidth >= halfConWidth) {
      setLeft(halfConWidth - leftWidth);
    } else if (leftWidth < halfConWidth) setLeft(0);
    else if (rightWidth < halfConWidth) setLeft(conWidth - width);
  }, [domRef, conRef, activeIndex, arrowLeft]);

  useEffect(() => {
    if (domRef.current)
      domRef.current.style.transform = `translateX(${left}px)`;
  }, [domRef, left]);

  useEffect(() => {
    window.addEventListener("keydown", keyCallback);
    return () => {
      window.removeEventListener("keydown", keyCallback);
    };
  }, [keyCallback]);

  function toggle(index: number) {
    setActive(index);
  }

  useEffect(() => {
    const springWobbly = (t: number) => -0.5 * (2.71828 ** (-6 * t)) * (
      -2 * (2.71828 ** (6 * t)) + Math.sin(12 * t) + 2 * Math.cos(12 * t))

    const lerp = (a: number, b: number, p: number) => a + p * (b - a)
    let str = ""
    for (let i = 0; i < 117; i++) {
      let p = springWobbly(i / 100)
      str += `${i - 17}% { transform: translateX(${lerp(100, 0, p)}px)}`
    }
    console.log(str)
  }, [])

  return (
    <div tabIndex={0} className={styles["roles-container"]}>
      <div className={styles["left-mask"]}>
        <div className={styles["right-mask"]} ref={conRef}>
          <ul
            className={classNames(
              styles["source-item-wrap"],
              !moveFlag && styles["transition"]
            )}
            ref={domRef}
          >
            {rolesList.concat(rolesList).map((role, index) => (
              <RoleAvatar
                key={index}
                name={role}
                isActive={index === activeIndex}
                onClick={() => toggle(index)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

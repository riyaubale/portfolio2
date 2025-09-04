// CardSwap.jsx
import React, {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    useEffect,
    useMemo,
    useRef,
    useImperativeHandle,
  } from "react";
  import gsap from "gsap";
  import "./CardSwap.css";
  
  export const Card = forwardRef(({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`card ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    />
  ));
  Card.displayName = "Card";
  
  const makeSlot = (i, distX, distY, total) => {
    const middle = (total - 1) / 2;
    return {
      x: i * distX,
      y: -i * distY,
      z: -i * distX * 1.5,
      zIndex: total - i,
      rotateY: (i - middle) * 5,
      scale: 1 - i * 0.05,
      blur: i * 1.5,
      delay: i * 0.03,
    };
  };
  
  const placeNow = (el, slot) =>
    gsap.set(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      xPercent: -50,
      yPercent: -50,
      rotateY: slot.rotateY,
      scale: slot.scale,
      zIndex: slot.zIndex,
      filter: `blur(${slot.blur}px)`,
      transformOrigin: "center center",
      force3D: true,
    });
  
  const animateToSlot = (el, slot, config) =>
    gsap.to(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      xPercent: -50,
      yPercent: -50,
      rotateY: slot.rotateY,
      scale: slot.scale,
      zIndex: slot.zIndex,
      filter: `blur(${slot.blur}px)`,
      duration: config.durMove,
      ease: config.ease,
      force3D: true,
      delay: slot.delay,
    });
  
  const CardSwap = forwardRef(
    (
      {
        width = 500,
        height = 400,
        cardDistance = 60,
        verticalDistance = 70,
        delay = null,
        pauseOnHover = false,
        onCardClick,
        easing = "power",
        children,
      },
      ref
    ) => {
      const config = {
        ease: "power1.inOut",
        durMove: 0.8,
      };
  
      const childArr = useMemo(() => Children.toArray(children), [children]);
      const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr.length]);
      const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
      const container = useRef(null);
  
      const animateToNewOrder = () => {
        order.current.forEach((cardIndex, slotIndex) => {
          const el = refs[cardIndex].current;
          const slot = makeSlot(slotIndex, cardDistance, verticalDistance, refs.length);
          animateToSlot(el, slot, config);
        });
      };
  
      useEffect(() => {
        refs.forEach((r, i) => {
          const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
          placeNow(r.current, slot);
        });
        return () => {};
      }, [cardDistance, verticalDistance]);
  
      useImperativeHandle(ref, () => ({
        next: () => {
          const [first, ...rest] = order.current;
          order.current = [...rest, first];
          animateToNewOrder();
        },
        prev: () => {
          const last = order.current.pop();
          order.current = [last, ...order.current];
          animateToNewOrder();
        },
      }));
  
      const rendered = childArr.map((child, i) => {
        const cardRef = refs[i];
  
        return isValidElement(child)
          ? cloneElement(child, {
              key: i,
              ref: cardRef,
              style: { width, height, ...(child.props.style ?? {}) },
              onClick: (e) => {
                child.props.onClick?.(e);
                onCardClick?.(i);
  
                const currentIndex = order.current.indexOf(i);
                if (currentIndex === -1 || currentIndex === 0) return;
  
                const newOrder = [
                  ...order.current.slice(currentIndex),
                  ...order.current.slice(0, currentIndex),
                ];
                order.current = newOrder;
                animateToNewOrder();
              },
              onMouseEnter: () => {
                const el = cardRef.current;
                gsap.to(el, {
                  y: "-=20",
                  z: "+=150",
                  scale: "+=0.08",
                  duration: 0.35,
                  ease: "power2.out",
                });
              },
              onMouseLeave: () => {
                const currentIndex = order.current.indexOf(i);
                const el = cardRef.current;
                const slot = makeSlot(currentIndex, cardDistance, verticalDistance, refs.length);
                animateToSlot(el, slot, config);
              },
            })
          : child;
      });
  
      return (
        <div
          ref={container}
          className="card-swap-container"
          style={{ width, height }}
        >
          {rendered}
        </div>
      );
    }
  );
  
  export default CardSwap;
  
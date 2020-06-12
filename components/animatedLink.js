/** @jsx jsx */
import React, { useState } from "react";
import { css, jsx } from "@emotion/core";
import { gsap } from "gsap";

const SVGComponent = props => {
  return (
    <svg
      {...props}
      css={css`
        position: absolute;
        overflow: hidden;
        width: 0;
        height: 0;
        pointer-events: none;
      `}
    >
      <defs>
        <filter id="warped">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.15 0.02"
            numOctaves={3}
            result="warp"
          />
          <feDisplacementMap
            xChannelSelector="R"
            yChannelSelector="G"
            scale={props.scale}
            in="SourceGraphic"
            in2="warp"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const SVGAnimatedLink = () => {
  const [filter, setFilter] = useState("none");
  const [scale, setScale] = useState(0);
  const primitiveValues = { scale: 0 };

  const timeline = gsap.timeline({
    paused: true,
    onStart: () => {
      setFilter(`url('#warped')`);
    },
    onUpdate: () => {
      setScale(primitiveValues.scale)
    },
    onComplete: () => {
      setFilter("none");
    },
  });

  timeline
    .to(primitiveValues, {
      duration: 0.1,
      ease: 'Expo.easeOut',
      startAt: { scale: 0 },
      scale: 60
    })
    .to(primitiveValues, {
      duration: 0.6,
      ease: 'Back.easeOut',
      scale: 0
    });

  const onMouseEnter = () => {
    timeline.restart();
  };
  const onMouseLeave = () => {
    timeline.progress(1).kill();
  };

  return (
    <>
      <SVGComponent scale={scale} />
      <a
        href="#"
        css={css`
          text-decoration: none;
          color: #4bffa5;
          outline: none;
          flex: none;
          padding-bottom: 0.5rem;
          font-size: 1.85rem;
          position: relative;
          line-height: 1;
          color: #000;
          margin-bottom: 2.5rem;
        `}
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseLeave()}
      >
        <span
          css={css`
            display: block;
            position: relative;
            outline: 100px solid transparent;
            filter: ${filter};
          `}
        >
          Burt
        </span>
        <span
          css={css`
            outline: 120px solid transparent;
            opacity: 0;
            position: absolute;
            pointer-events: none;
            bottom: 0;
            left: 0;
            height: 1px;
            width: 100%;
            background: currentColor;
            filter: ${filter};
          `}
        ></span>
      </a>
    </>
  );
};

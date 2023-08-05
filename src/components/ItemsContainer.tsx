"use client";
import React from "react";
import styled from "styled-components";

type Gap = "lg" | "md" | number;

const gapSizes: { [k in Gap]: number } = {
  lg: 1,
  md: 0.75,
};

export const ItemsContainer = styled.div<{
  $align?: "center" | "bottom";
  $gap?: Gap;
  $noWrap?: boolean;
  $gapHorizontal?: string;
  $gapVertical?: Gap;
  $hAlign?: React.CSSProperties["justifyContent"];
  $fDir?: "column";
}>`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  ${(p) => p.$noWrap && `flex-wrap: nowrap;`}
  ${(p) => p.$align === "center" && `align-items: center;`}
  ${(p) => p.$align === "bottom" && `align-items: flex-end;`}
  ${(p) => p.$hAlign && `justify-content: ${p.$hAlign};`}
  ${(p) =>
    p.$gap &&
    `gap: ${typeof p.$gap === "number" ? p.$gap : gapSizes[p.$gap]}rem;`}
  ${(p) => p.$gapVertical && `margin: ${gapSizes[p.$gapVertical]}rem 0;`}
  ${(p) => p.$fDir && `flex-direction: ${p.$fDir};`}
`;

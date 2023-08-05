"use client";
import { fontRobotoMono } from "lib/fonts";
import { css, styled } from "styled-components";

type ThProps = { $active?: boolean };
export const Th = styled.th<ThProps>`
  background: var(--bg-tertiary);
  border: 1px solid var(--bg-tertiary);
  color: var(--text-primary);
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 5000;
  font-size: 0.75rem;
  height: 2rem;
  transition: 0.1s all;
  &:first-child {
    z-index: 5050;
    left: 0;
  }
  ${(p) =>
    p.$active &&
    css`
      background: var(--primary);
      color: white;
    `}
`;

export const ThLower = styled(Th)`
  top: calc(2rem + 1px);
`;

type TdProps = {
  $active?: boolean;
  $semiActive?: boolean;
  $isOverLimit?: boolean;
};

const cssOverLimit = css<TdProps>`
  &:not(:first-child) {
    background: var(--danger-tertiary);
    /* border-color: var(--danger-tertiary); */

    ${(p) =>
      p.$semiActive &&
      css`
        background: var(--danger-secondary);
      `}
    ${(p) =>
      p.$active &&
      css`
        background: var(--danger);
        outline: 2px solid var(--danger);
      `}
  }
`;

export const Td = styled.td<TdProps>`
  color: var(--text-secondary);
  font-size: 0.75rem;
  border: 1px solid var(--border-color);
  transition: 0.1s all;

  &:first-child {
    background: var(--bg-secondary);
    font-weight: 600;
  }

  ${(p) =>
    p.$active
      ? css`
          background: var(--primary);
          color: white;
          font-weight: 500;
          &:first-child {
            background: var(--primary);
          }
          &:not(:first-child) {
            outline: 2px solid var(--primary);
            border-radius: 2px;
            position: relative;
            z-index: 2000;
          }
        `
      : p.$semiActive
      ? css`
          background: var(--bg-secondary);
          font-weight: 500;
        `
      : null}

  ${(p) => p.$isOverLimit && cssOverLimit}
`;

export const FpsTableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: auto;

  position: relative;
`;
export const FpsTable = styled.table`
  position: relative;
  /* border-collapse: collapse; */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: var(--bg-primary);
  border-spacing: 0;

  font-family: ${fontRobotoMono.style.fontFamily};

  ${Th},
  ${Td} {
    padding: 0.4rem 0.75rem;
  }

  td,
  th {
    text-align: center;
  }
  td:first-child {
    position: sticky;
    left: 0;
    z-index: 100;
    text-align: right;
  }

  th:first-child,
  td:first-child {
    width: 150px;
    text-align: right;
  }
`;

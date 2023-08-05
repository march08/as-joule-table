"use client";
import { css, styled } from "styled-components";

const cssVelocityButtonPrimary = css`
  background: var(--primary);
  border: 1px solid var(--primary);
  color: white;
`;

export const Button = styled.button<{ $primary?: boolean }>`
  border-radius: 4px;
  border: none;
  outline: none;
  padding: 0 0.5rem;
  height: 1.25rem;
  font-size: 0.75rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover,
  &:active,
  &:focus {
    box-shadow: inset 0 0 0px 50px rgba(128, 128, 128, 0.15);
  }

  ${(p) => p.$primary && cssVelocityButtonPrimary}
`;

"use client";

import React, { FC, MouseEvent, useCallback, useMemo } from "react";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type CloseReason = "backdropClick" | "closeButton";

export interface ModalProps {
  open: boolean;
  onBackdropClick?(event: MouseEvent): void;
  onClose?(event: object, reason: CloseReason): void;
  children?: ReactNode;
  backdrop?: boolean;
}

const Modal: FC<ModalProps> = ({
  open,
  onClose,
  onBackdropClick,
  children,
  backdrop = true,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const handleClose = useCallback(
    (event: MouseEvent, reason: CloseReason) => {
      onClose?.(event, reason);

      if (reason == "backdropClick") {
        onBackdropClick?.(event);
      }

      document.body.style.overflowY = "";
      document.body.style.paddingRight = "";
    },
    [onBackdropClick, onClose]
  );

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const reslovedChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return null;
      }

      return React.cloneElement(child as React.ReactElement, {
        onClose: handleClose,
      });
    });
  }, [children, handleClose]);

  if (!open || !isBrowser) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[101]">
      {backdrop && (
        <div
          onClick={(e) => handleClose(e, "backdropClick")}
          className="fixed inset-0 bg-black-400"
        />
      )}

      {reslovedChildren}
    </div>,

    document.body
  );
};

export default Modal;

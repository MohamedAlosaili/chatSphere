import { useRef, useEffect } from "react";

const useEditAnimation = (showEditMessage: boolean) => {
  const messageRef = useRef<HTMLDivElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageContainerRef.current && messageRef.current) {
      if (showEditMessage) {
        messageContainerRef.current.style.zIndex = "100";
      } else {
        messageRef.current.style.transform = `none`;
        setTimeout(() => {
          messageContainerRef.current &&
            (messageContainerRef.current.style.zIndex = "auto");
        }, 300);
      }
    }
  }, [showEditMessage]);

  return { messageContainerRef, messageRef };
};

export default useEditAnimation;

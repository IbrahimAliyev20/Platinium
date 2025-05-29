"use client";

import { useState } from "react";

const ToggleDescription = ({ text }: { text: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (text.length <= 30) {
    return <p className="text-gray-500 text-[16px] mt-4">{text}</p>;
  }

  return (
    <p
      className="text-gray-500 text-[14px] mt-4 cursor-pointer select-none"
      onClick={() => setIsOpen(!isOpen)}
      title="Aç/Bağla"
    >
      {isOpen ? text : text.slice(0, 30) + "..."}
    </p>
  );
};

export default ToggleDescription;

"use client";

import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { useMessagesStore } from "@/store/messagesStore";

export function Game() {
  const { messages, addMessage } = useMessagesStore();
  const lastMessage = messages[messages.length - 1];

  function handleUp() {
    if (messages.length === 0) {
      fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer: "ready", messages }),
      })
        .then((res) => res.json())
        .then((data) => {
          addMessage(["user", "ready"]);
          addMessage(["assistant", data.question]);
        });
    } else {
      fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer: "yes", messages }),
      })
        .then((res) => res.json())
        .then((data) => {
          addMessage(["user", "yes"]);
          addMessage(["assistant", data.question]);
        });
    }
  }

  function handleDown() {
    fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer: "no", messages }),
    })
      .then((res) => res.json())
      .then((data) => {
        addMessage(["user", "no"]);
        addMessage(["assistant", data.question]);
      });
  }

  function handleUnclear() {
    fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer: "unclear", messages }),
    })
      .then((res) => res.json())
      .then((data) => {
        addMessage(["user", "unclear"]);
        addMessage(["assistant", data.question]);
      });
  }

  return (
    <div className="max-w-sm">
      {messages.length === 0 && (
        <div className="text-2xl text-amber-950 font-semibold">
          Ready? Think of a word and I'll guess it.
        </div>
      )}

      {messages.length > 0 && (
        <div className="text-2xl text-amber-950 font-semibold">
          {lastMessage[1]}
        </div>
      )}

      <div className="flex flex-row items-center h-36 gap-4 justify-center">
        <div className="flex-1 text-[5rem] text-green-500 active:text-green-600 active:text-[5.3rem] flex items-center justify-end">
          <FiThumbsUp onClick={handleUp} />
        </div>
        <div className="flex-1 text-[5rem] text-red-500 translate-y-6 active:text-red-600 active:text-[5.3rem] flex items-center justify-start">
          <FiThumbsDown onClick={handleDown} />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div
          className="text-[4rem] active:text-[4.3rem]"
          onClick={handleUnclear}
        >
          🤔
        </div>
      </div>
    </div>
  );
}

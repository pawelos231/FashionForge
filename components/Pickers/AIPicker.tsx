"use client";

type Props = {
  promp: string;
  setPromp: () => void;
  generatingImg: boolean;
  handleSubmit: () => void;
};

import React from "react";

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }) => {
  return (
    <div className="aipicker-container">
      <textarea
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea"
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <button title="Asking AI..." className="text-xs" />
        ) : (
          <>
            <button
              title="AI Logo"
              onClick={() => handleSubmit("logo")}
              className="text-xs"
            />

            <button
              title="AI Full"
              onClick={() => handleSubmit("full")}
              className="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(AIPicker);

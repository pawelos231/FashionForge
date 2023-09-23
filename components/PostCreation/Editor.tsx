"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import React from "react";
import { uploadFiles } from "@lib/uploadthing";
import EditorJS from "@editorjs/editorjs";
import "@styles/editor.css";

type Props = {
  HandleChange: (value: string) => void;
};

type TextEditorRef = {
  save: () => Promise<void>;
};

const TextEditor = React.memo(
  React.forwardRef<TextEditorRef, Props>(
    ({ HandleChange }, parentRef): JSX.Element => {
      const editorRef = useRef<EditorJS>();
      const [isMounted, setIsMounted] = useState<boolean>(false);

      const initializeEditor = useCallback(async () => {
        const [
          EditorJS,
          Header,
          Embed,
          Table,
          List,
          Code,
          LinkTool,
          InlineCode,
          ImageTool,
        ] = await Promise.all([
          import("@editorjs/editorjs"),
          import("@editorjs/header"),
          import("@editorjs/embed"),
          import("@editorjs/table"),
          import("@editorjs/list"),
          import("@editorjs/code"),
          import("@editorjs/link"),
          import("@editorjs/inline-code"),
          import("@editorjs/image"),
        ]);

        if (!editorRef.current) {
          const editor = new EditorJS.default({
            holder: "editor",
            onReady() {
              editorRef.current = editor;
            },
            placeholder: "Type here to write your post...",
            inlineToolbar: true,
            data: { blocks: [] },
            tools: {
              header: Header.default,
              linkTool: {
                class: LinkTool.default,
                config: {
                  endpoint: "/api/link",
                },
              },
              image: {
                class: ImageTool.default,
                config: {
                  uploader: {
                    async uploadByFile(file: File) {
                      const [res] = await uploadFiles({
                        endpoint: "imageUploader",
                        onUploadProgress: ({ progress }) => {
                          //customToast(<ProgressBar progress={progress} />);
                        },
                        files: [file],
                      });

                      return {
                        success: 1,
                        file: {
                          url: res.fileUrl,
                        },
                      };
                    },
                  },
                },
              },
              list: List.default,
              code: Code.default,
              inlineCode: InlineCode.default,
              table: Table.default,
              embed: Embed.default,
            },
          });
        }
      }, []);

      useEffect(() => {
        if (typeof window !== "undefined") {
          setIsMounted(true);
        }
      }, []);

      useEffect(() => {
        const init = async () => {
          await initializeEditor();
        };

        if (isMounted) {
          init();

          return () => {
            editorRef.current?.destroy();
            editorRef.current = undefined;
          };
        }
      }, [isMounted, initializeEditor]);

      if (!isMounted) {
        return <></>;
      }

      const changeEditorValue = async () => {
        const blocks = await editorRef.current?.save();
        HandleChange(blocks! as unknown as string);
      };

      return (
        <>
          <div
            id="editor"
            className="min-h-[500px]"
            onKeyDown={changeEditorValue}
          />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </>
      );
    }
  )
);

export default TextEditor;

"use client";

// import NotificationsPopover from "../notifications-popover";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { useLiveblocksExtension, FloatingComposer, FloatingThreads, AnchoredThreads } from "@liveblocks/react-tiptap";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import { useThreads } from "@liveblocks/react";
import { Avatars } from "./Avatars";
// import { useIsMobile } from "./use-is-mobile";
// import VersionsDialog from "../version-history-dialog";
import { sendFullEditorContentToOpenAI } from "@/app/services/openai-service";
import { useState, useEffect } from "react";
import { AICommentDisplay } from "./AICommentDisplay";
import Highlight from '@tiptap/extension-highlight';
import { AILoading } from './AILoading';

interface Comment {
  sentence: string;
  comment: string;
  type: "suggestion" | "praise" | "correction";
  position?: {
    from: number;
    to: number;
  };
}

export default function TiptapEditor() {
  const [aiResponse, setAIResponse] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [processedComments, setProcessedComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const liveblocks = useLiveblocksExtension();

  const editor = useEditor({
    editorProps: {
      attributes: {
        // Add styles to editor element
        class: "outline-none flex-1 transition-all",
      },
    },
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight.configure({
        multicolor: true,  // 允许多种颜色
      }),
      liveblocks
    ],
    immediatelyRender: false
  });

  // 监听 showComments 变化
  useEffect(() => {
    if (showComments && editor && aiResponse) {
      try {
        const comments = JSON.parse(aiResponse).comments;
        const processed = handleAIComments(editor, comments);
        setProcessedComments(processed);
      } catch (error) {
        console.error('Failed to parse comments:', error);
      }
    }
  }, [showComments, aiResponse, editor]);

  return (
    <div className="flex flex-col relative border rounded-xl bg-white w-full h-full text-black">
      <div className="flex justify-between items-center border-b">
        <Toolbar editor={editor} />
        <Avatars />
      </div>

      {/* 添加主要内容区域的布局 */}
      <div className="flex h-full">
        {/* 编辑器区域 60% */}
        <div className="w-[60%] border-r relative">
          <EditorContent editor={editor} className="h-full p-4"/>
          <FloatingComposer editor={editor} className="w-[350px]" />
          <button 
            className={`absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={async () => {
              if (editor && !isLoading) {
                setIsLoading(true);
                setShowComments(true);
                await sendFullEditorContentToOpenAI(editor, setAIResponse);
                setIsLoading(false);
              }
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </div>
            ) : (
              'Send to AI'
            )}
          </button>
        </div>

        {/* 评论区域 40% */}
        <div className="w-[40%] relative">
          <div className="h-full overflow-y-auto">
            <Threads editor={editor} />
            {showComments && (
              isLoading ? (
                <AILoading />
              ) : (
                <AICommentDisplay comments={processedComments} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Threads({ editor }: { editor: Editor | null }) {
  const { threads } = useThreads();
  // const isMobile = useIsMobile();

  if (!threads || !editor) { return null; }

  return (
    <AnchoredThreads
      threads={threads}
      editor={editor}
      className="w-[350px] xl:mr-[100px] mr-[50px]"
    />
  );
}

function getHighlightColor(type: string) {
  switch (type) {
    case "suggestion": return "#DBEAFE";  // 浅蓝色
    case "praise": return "#DCFCE7";      // 浅绿色
    case "correction": return "#FEE2E2";  // 浅红色
    default: return "#F3F4F6";            // 浅灰色
  }
}

function handleAIComments(editor: Editor, comments: any[]) {
  // 先清除所有高亮
  editor.chain().unsetMark('highlight').run();

  const processedComments = comments.map((comment) => {
    const { sentence, type } = comment;
    const content = editor.state.doc.textContent;
    const position = content.indexOf(sentence);
    
    if (position !== -1) {
      const from = position;
      const to = position + sentence.length;
      
      // 只添加高亮，不添加下划线
      editor.chain()
        .setTextSelection({ from, to })
        .setMark('highlight', { color: getHighlightColor(type) })
        .run();

      return {
        ...comment,
        position: { from, to }
      };
    }
    return comment;
  });

  return processedComments;
}

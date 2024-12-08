import { Editor } from "@tiptap/react";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

type Props = {
  editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2 p-4">
      <button
                className="flex items-center justify-center cursor-pointer rounded-md h-8 w-8 bg-white text-gray-800 border-none shadow-md hover:text-gray-900 hover:shadow-lg focus:outline-offset-2 active:shadow-sm data-[active=is-active]:bg-gray-300"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        data-active={editor.isActive("bold") ? "is-active" : undefined}
        aria-label="bold"
      >
        B
      </button>
      <button
        className="flex items-center justify-center cursor-pointer rounded-md h-8 w-8 bg-white text-gray-800 border-none shadow-md hover:text-gray-900 hover:shadow-lg focus:outline-offset-2 active:shadow-sm data-[active=is-active]:bg-gray-300"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        data-active={editor.isActive("italic") ? "is-active" : undefined}
        aria-label="italic"
      >
        i
      </button>
      <button
        className="flex items-center justify-center cursor-pointer rounded-md h-8 w-8 bg-white text-gray-800 border-none shadow-md hover:text-gray-900 hover:shadow-lg focus:outline-offset-2 active:shadow-sm data-[active=is-active]:bg-gray-300"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        data-active={editor.isActive("strike") ? "is-active" : undefined}
        aria-label="strikethrough"
      >
        S
      </button>
      <button className="flex items-center justify-center cursor-pointer rounded-md h-8 w-8 bg-white text-gray-800 border-none shadow-md hover:text-gray-900 hover:shadow-lg focus:outline-offset-2 active:shadow-sm data-[active=is-active]:bg-gray-300"
        onClick={() => editor.chain().focus().addPendingComment().run()}

        data-active={editor.isActive("lb-comment") ? "is-active" : undefined}
        aria-label="strikethrough"
      >
        <ChatBubbleBottomCenterIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
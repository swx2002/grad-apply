// "use client";

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Collaboration from "@tiptap/extension-collaboration";
// import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
// import * as Y from "yjs";
// import { LiveblocksYjsProvider } from "@liveblocks/yjs";
// import { useRoom, useSelf } from "@liveblocks/react/suspense";
// import { useEffect, useState } from "react";
// import { Toolbar } from "./Toolbar";
// import styles from "./Editor.module.css";
// import { Avatars } from "./Avatars";

// // Collaborative text editor with simple rich text, live cursors, and live avatars
// export function Editor() {
//   const room = useRoom();
//   const [doc, setDoc] = useState<Y.Doc>();
//   const [provider, setProvider] = useState<any>();

//   // Set up Liveblocks Yjs provider
//   useEffect(() => {
//     const yDoc = new Y.Doc();
//     const yProvider = new LiveblocksYjsProvider(room, yDoc);
//     setDoc(yDoc);
//     setProvider(yProvider);

//     return () => {
//       yDoc?.destroy();
//       yProvider?.destroy();
//     };
//   }, [room]);

//   if (!doc || !provider) {
//     return null;
//   }

//   return <TiptapEditor doc={doc} provider={provider} />;
// }

// type EditorProps = {
//   doc: Y.Doc;
//   provider: any;
// };

// function TiptapEditor({ doc, provider }: EditorProps) {
//   // Get user info from Liveblocks authentication endpoint
//   const userInfo = useSelf((me) => me.info);

//   // Set up editor with plugins, and place user info into Yjs awareness and cursors
//   const editor = useEditor({
//     editorProps: {
//       attributes: {
//         // Add styles to editor element
//         class: styles.editor,
//       },
//     },
//     extensions: [
//       StarterKit.configure({
//         // The Collaboration extension comes with its own history handling
//         history: false,
//       }),
//       // Register the document with Tiptap
//       Collaboration.configure({
//         document: doc,
//       }),
//       // Attach provider and user info
//       CollaborationCursor.configure({
//         provider: provider,
//         user: userInfo,
//       }),
//     ],
//   });

//   return (
//     <div className={styles.container}>
//       <div className={styles.editorHeader}>
//         <Toolbar editor={editor} />
//         <Avatars />
//       </div>
//       <EditorContent editor={editor} className={styles.editorContainer} />
//     </div>
//   );
// }

"use client";

// import NotificationsPopover from "../notifications-popover";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { useLiveblocksExtension, FloatingComposer, FloatingThreads, AnchoredThreads } from "@liveblocks/react-tiptap";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from './Toolbar'
import { useThreads } from "@liveblocks/react";
import { Avatars } from "./Avatars";
// import { useIsMobile } from "./use-is-mobile";
// import VersionsDialog from "../version-history-dialog";

export default function TiptapEditor() {
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
      liveblocks
    ],
  });

  return (
      <div className="flex flex-col relative border rounded-xl bg-white w-full h-full text-black">
        {/* <div className="h-[60px] flex items-center justify-end px-4 border-b border-border/80 bg-background">
        <VersionsDialog editor={editor} />  
        <NotificationsPopover />
      </div> */}
        <div className="flex justify-between items-center">
          <Toolbar editor={editor} />
          <Avatars />
        </div>
          <EditorContent editor={editor} className="relative h-full p-4"/>
          <FloatingComposer editor={editor} className="w-[350px]" />
        <div className="xl:[&:not(:has(.lb-tiptap-anchored-threads))]:pr-[200px] [&:not(:has(.lb-tiptap-anchored-threads))]:pr-[50px]">
          <Threads editor={editor} />
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

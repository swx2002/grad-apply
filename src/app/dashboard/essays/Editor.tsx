// "use client";

// import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { Threads } from "./Threads";
// import { Toolbar } from "./Toolbar";
// import styles from "./Editor.module.css";
// export function Editor() {
//   const liveblocks = useLiveblocksExtension();

//   const editor = useEditor({
//     extensions: [
//       liveblocks,
//       StarterKit.configure({
//         // The Liveblocks extension comes with its own history handling
//         history: false,
//       }),
//     ],
//     immediatelyRender: false,
//   });

//   return (
//     <div className={styles.container}>
//       <div className={styles.editorHeader}>
//       <Toolbar editor={editor} />
//       </div>
//       <EditorContent editor={editor} className={styles.editorContainer} />
//       <Threads editor={editor} />
//     </div>
//   );
// }
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import { useEffect, useState } from "react";
import { Toolbar } from "./Toolbar";
import styles from "./Editor.module.css";
import { Avatars } from "./Avatars";

// Collaborative text editor with simple rich text, live cursors, and live avatars
export function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return <TiptapEditor doc={doc} provider={provider} />;
}

type EditorProps = {
  doc: Y.Doc;
  provider: any;
};

function TiptapEditor({ doc, provider }: EditorProps) {
  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me) => me.info);

  // Set up editor with plugins, and place user info into Yjs awareness and cursors
  const editor = useEditor({
    editorProps: {
      attributes: {
        // Add styles to editor element
        class: styles.editor,
      },
    },
    extensions: [
      StarterKit.configure({
        // The Collaboration extension comes with its own history handling
        history: false,
      }),
      // Register the document with Tiptap
      Collaboration.configure({
        document: doc,
      }),
      // Attach provider and user info
      CollaborationCursor.configure({
        provider: provider,
        user: userInfo,
      }),
    ],
  });

  return (
    <div className={styles.container}>
      <div className={styles.editorHeader}>
        <Toolbar editor={editor} />
        <Avatars />
      </div>
      <EditorContent editor={editor} className={styles.editorContainer} />
    </div>
  );
}
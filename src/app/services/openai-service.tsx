import { Editor } from "@tiptap/react";

export async function sendFullEditorContentToOpenAI(editor: Editor, onUpdate: (text: string) => void) {
    const content = editor.getText();
    
    try {
        const response = await fetch('/api/AI/comment-auto-generate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({editorContent: content}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        onUpdate(text);

    } catch (error) {
        onUpdate('Error: ' + (error as Error).message);
    }
}
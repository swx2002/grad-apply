'use client'
import TiptapEditor from '../../ui/text-editor/Editor'
import { Room } from './Room'
import { Suspense } from 'react'
export default function EssaysPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Room>
          <TiptapEditor />
        </Room>
        </Suspense>
    </div>
  );
}
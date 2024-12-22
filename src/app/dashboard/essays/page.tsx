'use client'
import { Editor } from './Editor'
import { Room } from './Room'
import { Suspense } from 'react'
export default function EssaysPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Room>
          <Editor />
        </Room>
        </Suspense>
    </div>
  );
}
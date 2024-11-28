
import { Providers } from "./Providers";

export const metadata = {
  title: "Liveblocks",
};

export default function EssaysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}
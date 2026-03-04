import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-24 h-6 bg-white flex items-center justify-center text-black font-bold text-xs">
        Logo
      </div>
     
    </Link>
  );
}

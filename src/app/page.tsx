import { Button } from '@/components/ui/button';
import Image from 'next/image';
import LogoIe from '../../public/ie-logo.png';

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="w-full flex items-center justify-between px-6">
        <Image src={LogoIe} alt="logo do IE" className="w-24 h-w-24" />
        <Button size={'lg'}>Inscrever-se</Button>
      </header>
      <main></main>
    </div>
  );
}

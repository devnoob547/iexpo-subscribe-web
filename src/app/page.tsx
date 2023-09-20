'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import LogoIe from '../../public/ie-logo.png';
import { UserPlus2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  function handleButtonClick() {
    router.push('/subscribe');
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <header className="w-full flex items-center justify-between px-6">
        <Image src={LogoIe} alt="logo do IE" className="w-24 h-w-24" />
      </header>
      <main className="flex flex-col items-center justify-center flex-1 space-y-4 mx-5">
        <div className="w-fit flex flex-col justify-center space-y-4">
          <h1 className="text-5xl text-accent-foreground font-semibold">
            IEXPO 2023
          </h1>
          <p className="text-muted-foreground">
            Inscreva-se já para a IEXPO 2023, a amostra cultural do colégio IE
            em João Pessoa.
          </p>
          <Button
            className="w-full border-primary/40 text-primary py-6 hover:bg-primary hover:text-muted duration-500 flex items-center gap-2"
            size={'lg'}
            variant={'outline'}
            onClick={handleButtonClick}
          >
            <UserPlus2 />
            Inscrever-se
          </Button>
        </div>
      </main>
    </div>
  );
}

'use client';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { CheckCircle, Loader2, User2, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface EnrollmentType {
  name: string;
  email: string;
}

export function Form() {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();

  const { register, handleSubmit } = useForm<EnrollmentType>();
  const { push } = useRouter();

  async function handleClick({ name, email }: EnrollmentType) {
    if (!name && !email) {
      setIsRegister(false);
    }

    const { data } = await axios.post('http://localhost:5000/enrollment', {
      name,
      email,
    });

    setIsRegister(false);
    setName(data.name);
    setEmail(data.email);
    setIsRegister(true);
  }

  return (
    <form
      action="post"
      className="flex flex-col justify-center gap-4"
      onSubmit={handleSubmit(handleClick)}
    >
      <input
        {...register('name', { required: true })}
        required
        type="text"
        placeholder="Digite seu nome"
        onChange={(e) => setName(e.target.value)}
        className="border-[1px] text-base border-muted-foreground/20 shadow-sm shadow-muted-foreground/20 rounded-md px-4 py-2 outline-none focus:border-muted-foreground/40 focus:shadow-muted-foreground/40"
      />
      <input
        {...register('email', { required: true })}
        required
        type="email"
        placeholder="Digite seu email"
        onChange={(e) => setEmail(e.target.value)}
        className="border-[1px] text-base border-muted-foreground/20 shadow-sm shadow-muted-foreground/20 rounded-md px-4 py-2 outline-none focus:border-muted-foreground/40 focus:shadow-muted-foreground/40"
      />
      <div className="flex flex-col justify-center items-center">
        <AlertDialog>
          <AlertDialogTrigger
            type="submit"
            className="bg-primary py-2 w-full text-white rounded-md shadow-primary/40 shadow-md disabled:bg-primary/50 disabled:cursor-not-allowed transition-all duration-200"
            disabled={name && email ? false : true}
          >
            Fazer Inscrição!
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="flex justify-center items-center">
              {isRegister ? (
                <>
                  <AlertDialogDescription className="flex flex-col items-center gap-2 text-green-500 p-2">
                    <div className="flex items-center gap-2">
                      Inscrição efeituada com sucesso
                      <CheckCircle />
                    </div>
                    <div className="flex flex-col gap-2 border-muted-foreground/20 p-4 text-muted-foreground/80 border rounded-md">
                      <span className="flex items-center gap-2">
                        <User2 />
                        {name}
                      </span>
                      <span className="flex items-center gap-2">
                        <Mail />
                        {email}
                      </span>
                    </div>
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      className="w-full"
                      onClick={() => push('/')}
                    >
                      Concluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </>
              ) : (
                <>
                  <AlertDialogDescription className="flex items-center gap-2 text-muted-foreground/60 p-2">
                    Concluindo inscrição
                    <Loader2 className="animate-spin" />
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      disabled
                      className="w-full"
                      onClick={() => push('/')}
                    >
                      Concluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </>
              )}
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </form>
  );
}

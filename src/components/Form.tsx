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
import { CheckCircle, Loader2, XCircle, User2, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface InputTypes {
  name: string;
  email: string;
}

export function Form() {
  const [isRegister, setIsRegister] = useState<boolean | 'progress'>(false);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();

  const { register, handleSubmit } = useForm<InputTypes>();

  function handleClick({ name, email }: InputTypes) {
    if (!name && !email) {
      setIsRegister(false);
    }

    setIsRegister('progress');
    setName(name);
    setEmail(email);

    setTimeout(() => setIsRegister(true), 2000);
  }

  return (
    <form
      action=""
      className="flex flex-col justify-center gap-4"
      onSubmit={handleSubmit(handleClick)}
    >
      <input
        {...register('name', { required: true })}
        required
        type="text"
        placeholder="Digite seu nome"
        className="border-[1px] text-base border-muted-foreground/20 shadow-sm shadow-muted-foreground/20 rounded-md px-4 py-2 outline-none focus:border-muted-foreground/40 focus:shadow-muted-foreground/40"
      />
      <input
        {...register('email', { required: true })}
        required
        type="email"
        placeholder="Digite seu email"
        className="border-[1px] text-base border-muted-foreground/20 shadow-sm shadow-muted-foreground/20 rounded-md px-4 py-2 outline-none focus:border-muted-foreground/40 focus:shadow-muted-foreground/40"
      />
      <div className="flex flex-col justify-center items-center">
        <AlertDialog>
          <AlertDialogTrigger
            type="submit"
            className="bg-primary py-2 w-full text-white rounded-md shadow-primary/40 shadow-md"
          >
            Fazer Inscrição!
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="flex justify-center items-center">
              {isRegister === 'progress' ? (
                <>
                  <AlertDialogDescription className="flex items-center gap-2 text-muted-foreground/60 p-2">
                    Concluindo inscrição
                    <Loader2 className="animate-spin" />
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogAction disabled className="w-full">
                      Concluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </>
              ) : isRegister ? (
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
                    <AlertDialogAction className="w-full">
                      Concluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </>
              ) : (
                <>
                  <AlertDialogDescription className="flex items-center gap-2 text-red-500 p-2">
                    Você não preencheu seus dados!
                    <XCircle />
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogAction className="w-full">
                      Preencher
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

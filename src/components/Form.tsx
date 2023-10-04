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
import { CheckCircle, Loader2, User2, Mail, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

const enrollmentCreationForm = z.object({
  name: z
    .string()
    .nonempty({ message: 'O nome precisa ser preenchido!' })
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(' ');
    }),
  email: z
    .string()
    .nonempty({ message: 'O email precisa ser preenchido!' })
    .email({ message: 'Email invalido!' })
    .toLowerCase(),
});

type EnrollmentType = z.infer<typeof enrollmentCreationForm>;

interface EnrollmentDTO {
  id: string;
  name: string;
  email: string;
}

export function Form() {
  const [isRegister, setIsRegister] = useState<boolean | 'progress'>(false);
  const [enrollment, setEnrollment] = useState<EnrollmentDTO>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnrollmentType>({
    resolver: zodResolver(enrollmentCreationForm),
  });

  async function handleSubmitForm(formData: EnrollmentType) {
    if (errors.email?.message || errors.name?.message) {
      setIsRegister(false);
    }

    const { data } = await axios.post<EnrollmentDTO>(
      'http://localhost:5000/enrollment',
      formData,
    );

    setIsRegister(true);
    setEnrollment(data);
  }

  function handleClickAlertButton() {
    if (!errors.email || !errors.name) {
      router.push('/');
    }
  }

  return (
    <form
      action="post"
      className="flex flex-col justify-center gap-4"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <input
        {...register('name', { required: true })}
        type="text"
        placeholder="Digite seu nome"
        className="border-[1px] text-base border-muted-foreground/20 shadow-sm shadow-muted-foreground/20 rounded-md px-4 py-2 outline-none focus:border-muted-foreground/40 focus:shadow-muted-foreground/40"
      />
      {errors.name && (
        <span className="text-red-500 font-light transition-all duration-300">
          {errors.name.message}
        </span>
      )}
      <input
        {...register('email', { required: true })}
        type="email"
        placeholder="Digite seu email"
        className="border-[1px] text-base border-muted-foreground/20 shadow-sm shadow-muted-foreground/20 rounded-md px-4 py-2 outline-none focus:border-muted-foreground/40 focus:shadow-muted-foreground/40"
      />
      {errors.email && (
        <span className="text-red-500 font-light transition-all duration-300">
          {errors.email.message}
        </span>
      )}
      <div className="flex flex-col justify-center items-center">
        <AlertDialog>
          <AlertDialogTrigger
            type="submit"
            className="bg-primary py-2 w-full text-white rounded-md shadow-primary/40 shadow-md disabled:bg-primary/50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Fazer Inscrição!
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader className="flex justify-center items-center">
              <AlertDialogDescription
                data-sucess={isRegister}
                className="flex items-center gap-2 text-red-500 p-2 data-[sucess=true]:text-green-500"
              >
                {isRegister ? (
                  <>
                    Inscrição realizada com sucesso
                    <CheckCircle />
                  </>
                ) : (
                  <>
                    Preencha as informações necessárias
                    <XCircle />
                  </>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex flex-col gap-4 border-muted-foreground/20 p-4 text-muted-foreground/80 border rounded-md">
              {isRegister && (
                <>
                  <span className="flex items-center gap-2">
                    <User2 />
                    {enrollment?.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail />
                    {enrollment?.email}
                  </span>
                </>
              )}
              {!enrollment && (!errors.email || !errors.name) && (
                <div className="flex items-center justify-center w-full gap-2">
                  Finalizando inscrição
                  <Loader2 className="animate-spin" />
                </div>
              )}
              {!isRegister && (errors.email || errors.name) && (
                <p>
                  Você precisa preencher os campos de nome e email para fazer
                  seu cadastro
                </p>
              )}
            </div>
            <AlertDialogFooter>
              <AlertDialogAction
                className="w-full"
                onClick={handleClickAlertButton}
              >
                Concluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </form>
  );
}

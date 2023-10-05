'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { SubmitAlertDialog } from './FormSubmitAlert';

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

export interface EnrollmentDTO {
  id: string;
  name: string;
  email: string;
}

export function FormRoot() {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [enrollment, setEnrollment] = useState<EnrollmentDTO>();

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
      <SubmitAlertDialog
        isRegister={isRegister}
        errors={errors}
        enrollment={enrollment}
      />
    </form>
  );
}

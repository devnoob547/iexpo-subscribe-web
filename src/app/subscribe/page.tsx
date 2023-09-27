'use client';
import { Separator } from '@/components/ui/separator';
import { Form } from '@/components/Form';

export default function Subscribe() {
  return (
    <div className="min-h-screen flex items-center justify-center mx-4">
      <div className="p-10 flex flex-col justify-center gap-6 rounded-md shadow-md shadow-muted-foreground/20">
        <h1 className="text-xl font-light">Inscreva-se para IEXPO 2023</h1>
        <Separator />
        <Form />
      </div>
    </div>
  );
}

import { CheckCircle, XCircle, User2, Mail, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from '../ui/alert-dialog';
import { EnrollmentDTO } from './FormRoot';
import { FieldErrors } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface SubmitAlertDialogProps {
  isRegister: boolean;
  enrollment?: EnrollmentDTO;
  errors: FieldErrors<EnrollmentDTO>;
}

export function SubmitAlertDialog({
  isRegister,
  enrollment,
  errors,
}: SubmitAlertDialogProps) {
  const router = useRouter();

  function handleClickAlertButton() {
    if (!errors.email || !errors.name) {
      router.push('/');
    }
  }

  return (
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
                Você precisa preencher os campos de nome e email para fazer seu
                cadastro
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
  );
}

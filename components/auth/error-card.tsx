// Not in use

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
   return (
      <CardWrapper
         headerLabel="Quelque chose s'est mal passé"
         backButtonHref="/auth/login"
         backButtonLabel="Retour à la connexion"
      >
         <div className="mt-3 w-full flex justify-center">
            <ExclamationTriangleIcon className="text-destructive w-6 h-6" />
         </div>
      </CardWrapper>
   );
};

"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";

export const LoginForm = () => {
   const searchParams = useSearchParams();
   const urlError =
      searchParams.get("error") === "OAuthAccountNotLinked"
         ? "Courriel déjà utilisé par un autre fournisseur!"
         : "";
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [isPending, startTransition] = useTransition();

   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = (values: z.infer<typeof LoginSchema>) => {
      setError("");
      setSuccess("");

      startTransition(() => {
         login(values).then((data) => {
            setError(data?.error);
            // TODO: Add when we add 2FA
            // setSuccess(data?.success);
         });
      });
   };

   return (
      <CardWrapper
         headerLabel="Heureux de vous revoir"
         backButtonLabel="Vous n'avez pas de compte?"
         backButtonHref="/auth/register"
         showSocial
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Adresse courriel</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isPending}
                                 placeholder="Votre adresse courriel"
                                 type="email"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Mot de passe</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isPending}
                                 placeholder="******"
                                 type="password"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <FormError message={error || urlError} />
               <FormSuccess message={success} />
               <Button disabled={isPending} type="submit" className="w-full">
                  Connexion
               </Button>
            </form>
         </Form>
      </CardWrapper>
   );
};

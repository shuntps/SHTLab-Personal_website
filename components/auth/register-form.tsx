"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";

export const RegisterForm = () => {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [isPending, startTransition] = useTransition();

   const form = useForm<z.infer<typeof RegisterSchema>>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         email: "",
         password: "",
         name: "",
      },
   });

   const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
      setError("");
      setSuccess("");

      startTransition(() => {
         register(values).then((data) => {
            setError(data.error);
            setSuccess(data.success);
         });
      });
   };

   return (
      <CardWrapper
         headerLabel="Créer un compte"
         backButtonLabel="Vous avez déjà un compte?"
         backButtonHref="/auth/login"
         showSocial
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Nom</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isPending}
                                 placeholder="Votre nom"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
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
               <FormError message={error} />
               <FormSuccess message={success} />
               <Button disabled={isPending} type="submit" className="w-full">
                  Créer un compte
               </Button>
            </form>
         </Form>
      </CardWrapper>
   );
};

"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { SettingsSchema } from "@/schemas";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import {
   Form,
   FormField,
   FormControl,
   FormItem,
   FormLabel,
   FormDescription,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
   const user = useCurrentUser();
   const [error, setError] = useState<string | undefined>();
   const [success, setSuccess] = useState<string | undefined>();
   const { update } = useSession();
   const [isPending, startTransition] = useTransition();

   const form = useForm<z.infer<typeof SettingsSchema>>({
      resolver: zodResolver(SettingsSchema),
      defaultValues: {
         password: undefined,
         newPassword: undefined,
         name: user?.name || undefined,
         email: user?.email || undefined,
         role: user?.role || undefined,
         isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      },
   });

   const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
      startTransition(() => {
         settings(values)
            .then((data) => {
               if (data.error) {
                  setError(data.error);
               }

               if (data.success) {
                  update();
                  setSuccess(data.success);
               }
            })

            .catch(() => setError("Quelque chose s'est mal passé!"));
      });
   };

   return (
      <Card className="ml-2 mr-2 shadow-lg">
         <CardHeader>
            <p className="font-semibold text-center">⚙️ Paramètres</p>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form
                  className="space-y-6"
                  onSubmit={form.handleSubmit(onSubmit)}
               >
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
                                    placeholder="Votre nom"
                                    disabled={isPending}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     {user?.isOAuth === false && (
                        <>
                           <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                       <Input
                                          {...field}
                                          placeholder="Votre email"
                                          type="email"
                                          disabled={isPending}
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
                                          placeholder="******"
                                          type="password"
                                          disabled={isPending}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="newPassword"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Nouveau mot de passe</FormLabel>
                                    <FormControl>
                                       <Input
                                          {...field}
                                          placeholder="******"
                                          type="password"
                                          disabled={isPending}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </>
                     )}
                     <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Rôle</FormLabel>
                              <Select
                                 disabled={isPending}
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                              >
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Sélectionnez un rôle" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value={UserRole.ADMIN}>
                                       Administrateur
                                    </SelectItem>
                                    <SelectItem value={UserRole.USER}>
                                       Utilisateur
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     {user?.isOAuth === false && (
                        <FormField
                           control={form.control}
                           name="isTwoFactorEnabled"
                           render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                 <div className="space-y-0.5">
                                    <FormLabel>
                                       Authentification à deux facteurs
                                    </FormLabel>
                                    <FormDescription>
                                       Activer l'authentification à deux
                                       facteurs pour votre compte
                                    </FormDescription>
                                 </div>
                                 <FormControl>
                                    <Switch
                                       disabled={isPending}
                                       checked={field.value}
                                       onCheckedChange={field.onChange}
                                    />
                                 </FormControl>
                              </FormItem>
                           )}
                        />
                     )}
                  </div>
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button disabled={isPending} type="submit">
                     Sauvegarder
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
};

export default SettingsPage;

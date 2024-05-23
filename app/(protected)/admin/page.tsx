"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";

const AdminPage = () => {
   const onServerActionClick = () => {
      admin().then((data) => {
         if (data.error) {
            console.log(data.error);
         }

         if (data.success) {
            console.log(data.success);
         }
      });
   };

   const onApiRouteClick = () => {
      fetch("/api/admin").then((response) => {
         if (response.ok) {
            console.log("OKAY!");
         } else {
            console.error("FORBIDDEN!");
         }
      });
   };

   return (
      <Card className="ml-2 mr-2 shadow-lg">
         <CardHeader>
            <p className="font-semibold text-center">
               🔑 Page d'administration
            </p>
         </CardHeader>
         <CardContent className="space-y-4">
            <RoleGate allowedRole={UserRole.ADMIN}>
               <FormSuccess message="Vous êtes autorisé à accéder à ce contenu!" />
            </RoleGate>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
               <p className="text-sm font-medium">Admin-only API Route</p>
               <Button onClick={onApiRouteClick}>Click to test</Button>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
               <p className="text-sm font-medium">Admin-only Server Action</p>
               <Button onClick={onServerActionClick}>Click to test</Button>
            </div>
         </CardContent>
      </Card>
   );
};

export default AdminPage;

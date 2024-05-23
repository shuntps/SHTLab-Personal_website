"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
   const user = useCurrentUser();

   const onClick = () => {
      logout();
   };

   return (
      <div className="bg-white p-2 rounded-xl ml-2 mr-2">
         <button onClick={onClick} type="submit">
            Se déconnecter
         </button>
      </div>
   );
};

export default SettingsPage;

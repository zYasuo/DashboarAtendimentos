import React from 'react';
import { FiBell } from 'react-icons/fi';

export function UserComponent() {

    return (
        <div className="flex items-center space-x-4">


            <FiBell className="h-6 w-6 text-dl-700  hover:text-blue-300 cursor-pointer" />
            <div className="relative">
                {/* <Image src="URL_DO_AVATAR_DO_USUARIO" alt="Avatar do usuário" width={32} height={32} className="rounded-full cursor-pointer" onClick={handleUserClick} /> */}
            </div>



        </div>
    );
}

;
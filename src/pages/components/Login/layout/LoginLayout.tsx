import React from "react";

type Props = React.PropsWithChildren<{}>;

const LoginLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="w-full h-full">
            <div className="flex items-center justify-center shadow-2xl bg-black  rounded-md min-h-screen border-blue-500">
                <div className="rounded-md p-10 bg-neutral-900 w-full h-[500px] max-w-[476px] z-20 ">
                    <div className="flex items-center mb-4">
                        <h1 className="text-3xl font-bold text-dl-700">Bem vindo</h1>
                    </div>
                    <p className="mt-2 text-sm text-dl-400">Efetuar login</p>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default LoginLayout;

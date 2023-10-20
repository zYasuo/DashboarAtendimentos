import { FC, useState } from 'react';
import { useData } from '../hooks/DataContext';
import { TextInput } from './textInput/TextInput';
import { DateInput } from './/dateInput/DateInput';
import { SelectInput } from './selectInput/SelectInput';

export const FormAtendimento: FC = () => {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const { filiais, assuntos } = useData();  // Extraia assuntos do useData
    const assuntoOptions = assuntos || [];

    const handleFocus = (id: string) => setFocusedField(id);
    const handleBlur = () => setFocusedField(null);

    return (
        <div className="mt-6 bg-neutral-900 bg-opacity-50 border-gray-800 border border-opacity-50 p-6 flex justify-center rounded-md">
            <form className="space-y-4 w-full max-w-2xl bg-neutral-900 p-8 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-md m-2">
                <TextInput id="id" label="ID Cliente" placeholder="ID cliente" marginTop="mt-4" onFocus={handleFocus} onBlur={handleBlur} focused={focusedField} />
                <TextInput id="node" label="Node" placeholder="Node" onFocus={handleFocus} onBlur={handleBlur} focused={focusedField} />
                <TextInput id="cto" label="Cto" placeholder="CTO" onFocus={handleFocus} onBlur={handleBlur} focused={focusedField} />
                <DateInput id="dataAbertura" label="Data Abertura" onFocus={handleFocus} onBlur={handleBlur} focused={focusedField} />
                <SelectInput id="assunto" label="Assunto" options={assuntoOptions} onFocus={handleFocus} onBlur={handleBlur} focused={focusedField} />
                <SelectInput id="filial" label="Filial" options={filiais} onFocus={handleFocus} onBlur={handleBlur} focused={focusedField} />
                <div className="col-span-full text-center mt-4">
                    <button type="submit" className="px-4 py-2 bg-dl-700 text-white rounded-md hover:bg-blue-500">
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
};

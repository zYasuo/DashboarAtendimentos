// utils/dataTransformers.ts

export function transformDataByName(data: Array<{ nome: string }>) {
    const grouped = data.reduce((acc, item) => {
        acc[item.nome] = (acc[item.nome] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return Object.keys(grouped).map(name => ({
        name,
        uv: grouped[name],
    }));
}

export function transformDataBySubject(data: Array<{ assunto: string }>) {
    const grouped = data.reduce((acc, item) => {
        acc[item.assunto] = (acc[item.assunto] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return Object.keys(grouped).map(assunto => ({
        name: assunto,
        uv: grouped[assunto],
    }));
}


export function aggregateByAssunto(data: any[]) {
    const countByAssunto: { [key: string]: number } = {};

    data.forEach((item) => {
        if (!countByAssunto[item.assunto]) {
            countByAssunto[item.assunto] = 1;
        } else {
            countByAssunto[item.assunto]++;
        }
    });

    return Object.keys(countByAssunto).map((assunto) => ({
        name: assunto,
        uv: countByAssunto[assunto],
    }));
}


export function transformDataByFilial(data: Array<{ filial: string }>) {
    const grouped = data.reduce((acc, item) => {
        acc[item.filial] = (acc[item.filial] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return Object.keys(grouped).map(filial => ({
        name: filial,
        uv: grouped[filial],
    }));
}

export function transformDataByDate(data: Array<{ date: string, type: string }>) {
    const groupedByDateAndType = data.reduce((acc, item) => {
        if (!acc[item.date]) {
            acc[item.date] = { atendimentos: 0, chamados: 0 };
        }

        if (item.type === "atendimento") {
            acc[item.date].atendimentos += 1;
        } else if (item.type === "chamado") {
            acc[item.date].chamados += 1;
        }

        return acc;
    }, {} as Record<string, { atendimentos: number, chamados: number }>);

    return Object.keys(groupedByDateAndType).map(date => ({
        name: date,
        atendimentos: groupedByDateAndType[date].atendimentos,
        chamados: groupedByDateAndType[date].chamados
    }));
}




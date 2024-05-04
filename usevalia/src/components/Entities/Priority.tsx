export enum Priority {
    LOW = 'Bajo',
    MEDIUM = 'Medio',
    HIGH = 'Alto',
}

export const turnPesoIntoPriority = (peso: number): Priority => {
    if (peso === 3) {
        return Priority.LOW;
    } else if (peso === 2) {
        return Priority.MEDIUM;
    } else {
        return Priority.HIGH;
    }
}

export const turnPriorityIntoPeso = (priority: Priority): number => {
    if (priority === Priority.LOW) {
        return 3;
    } else if (priority === Priority.MEDIUM) {
        return 2;
    } else {
        return 1;
    }
}
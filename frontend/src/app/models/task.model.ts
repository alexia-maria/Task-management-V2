export interface Task {
    id?: number;
    title: string;
    description?: string;
    points: number;
    completed: boolean;
    deadline?: Date;
    difficulty?: string;
    assignedUserId?: number;
  }
  
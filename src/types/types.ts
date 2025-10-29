type gender = 'M' | 'F';

type RgbType = `#${string}`;
interface IColor {
  rgb: RgbType;
  id: number;
}
type StatusesType = 'idle' | 'loading' | 'succeeded' | 'failed';

interface IAuthor {
  name: string;
  avatar: string;
  gender: gender;
}

interface IComment {
  text: string;
  author: IAuthor;
  date: Date;
}

type PrioritiesName =
  | 'Очень низкий'
  | 'Низкий'
  | 'Средний'
  | 'Высокий'
  | 'Критический';

type StatusName =
  | 'Закрыта'
  | 'Отложена'
  | 'Согласование договора'
  | 'В работе'
  | 'Открыта'
  | 'Выполнена';

interface ITag {
  id: number;
  name: string;
}

interface IRequest {
  createdAt: string;
  description: string;
  executorGroupId: number;
  executorGroupName: string;
  executorId: number;
  executorName: string;
  id: number;
  initiatorId: number;
  initiatorName: string;
  name: string;
  price: number;
  priorityId: number;
  priorityName: PrioritiesName;
  resolutionDatePlan: string;
  serviceId: number;
  serviceName: string;
  statusId: number;
  statusName: string;
  statusRgb: RgbType;
  tags: ITag[];
  taskTypeId: number;
  taskTypeName: string;
  updatedAt: string;
}

export type {
  gender,
  IAuthor, IColor,
  IComment,
  IRequest,
  PrioritiesName,
  StatusesType, StatusName,
  RgbType,
};


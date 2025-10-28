type gender = 'M' | 'F';

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

export type { gender, IAuthor, IComment };

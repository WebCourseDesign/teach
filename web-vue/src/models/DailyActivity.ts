export interface Person {
  personId: number

  num: string

  name?: string

  type?: string

  dept?: string

  card?: string

  gender?: string

  birthday?: string

  email?: string

  phone?: string

  address?: string

  introduce?: string
}


export interface Student {
  studentId: number

  person: Person

  major?: string

  className?: string
}

export enum ActType  {
  'ACT_SPORT' = '运动',
  'ACT_CULTURE' = '文化',
  'ACT_TOUR' = '旅游',
  'ACT_OTHER' = '其他',
  'ACT_PARTY' = '聚会',
}

export interface DailyActivity {
  id?: number

  start: any

  end: any

  student: Student

  name: ActType
}

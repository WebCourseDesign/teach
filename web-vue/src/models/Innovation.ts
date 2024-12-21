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
  
  export interface Innovation {
    value: {}
    name: EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown>
    id: number
  
    student: Student
  
    socialPractice: string
  
    competition: string
  
    technology: string
  
    lecture: string
  
    project: string
  
    internship: string
  }
  
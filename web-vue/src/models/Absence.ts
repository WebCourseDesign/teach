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
  
  export interface Absence {
    value: {}
    socialPractice: EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown>
    competition: EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown>
    technology: EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown>
    lecture: EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown>
    project: EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown>
    internship: EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number | null | undefined) | ((new (...args: any[]) => string | number) | (() => string | number | null | undefined))[], unknown, unknown>
    id: number
  
    student: Student
  
    reason: string
  
    start: any
  
    end: any
  
    approved: number
  
    approver: Person
  
    approvedTime: any
  }
  
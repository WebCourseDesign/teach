export interface Person {
    personId: number
  
    num: string
  
    name: string
  
    type: string
  
    dept: string
  
    card: string
  
    gender: string
  
    birthday: string
  
    email: string
  
    phone: string
  
    address: string
  
    introduce: string
  }
  
  export interface Student {
    studentId: number
  
    person: Person
  
    major: string
  
    className: string
  }
  
  export interface Honor {
    honorId: number
  
    name: string
  
    description: string
  
    student: Student
  
    getTime: string
  
    reward: string
  }
  
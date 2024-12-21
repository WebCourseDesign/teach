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
  
  
  export interface Course {
  
    courseId: number
  
    num: string
  
    name?: string
  
    credit?: number
  
    preCourse?: any
  
    coursePath?: string
  
    teacher: Teacher
  
    maxCount?: number
  }
  
  export interface Student {
    studentId: number
  
    person: Person
  
    major?: string
  
    className?: string
  }
  

  
  export interface TaskSubmit {
    id: number
  
    task?: Task
  
    student: Student
  
    score?: number
  }
  
  export interface Teacher {
  
    teacherId: number
  
    person: Person
  
    title?: string
  
    degree?: string
  
    course: Course[]
  }
  
  export interface Task {
    taskId: number
  
    state: number
  
    taskNo: string
  
    taskPath: string
  
    taskName: string
  
    overTime: any
  
    course: Course
  
    submitList?: TaskSubmit[]
  }
  
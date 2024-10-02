export interface Employee {
    id: number;
    name: string;
    description: string;
    position: string;
    isActive: boolean;
  }


  export interface CreateEmployee {

    name: string;
    description: string;
    position: string;
    isActive: boolean;
  }


  export interface UpdateEmployee {
    id: string;
    name: string;
    description: string;
    position: string;
    isActive: boolean;
  }
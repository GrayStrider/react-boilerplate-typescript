export type User = {
  occupation: string;
  traits?: string[];
  name: string;
  age?: number;
  nested?: {
    nested2?: {
      nested3?: string
    }
  }
}

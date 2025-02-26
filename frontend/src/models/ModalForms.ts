export interface AddModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}


export interface NewEmployeeFormData {
    username: string;
    password: string;
    role: "admin" | "user";
  }
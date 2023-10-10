import * as yup from "yup"

export const createOccurrenceSchema = yup.object().shape({
  title: yup
    .string()
    .required("O título é obrigatório")
    .min(3, "O título deve ter pelo menos 3 caracteres"),
  description: yup
    .string()
    .required("A descrição é obrigatória")
    .min(3, "A descrição deve ter pelo menos 3 caracteres"),
  category: yup
    .string()
    .required("A categoria é obrigatória"),
  risk_level: yup
    .number()
    .required("O nível de risco é obrigatório"),
  status: yup
    .string()
    .required("O status é obrigatório"),
})
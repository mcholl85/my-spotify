import { DEFAULT_LIMIT } from '../../../constants/api.constants'

export const calcOffset = (page: number) => (page - 1) * DEFAULT_LIMIT

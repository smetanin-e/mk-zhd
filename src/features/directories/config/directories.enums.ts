export enum OperationCategory {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

export enum StationType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

export enum WagonOwnership {
  OWN = 'OWN', // принадлежит вашему предприятию (Имеет номера разных форматов)
  RENTED = 'RENTED', // арендованный (имеет 8-ми значный номер и зависит от типа вагона)
}

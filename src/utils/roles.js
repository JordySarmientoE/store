const Roles = {
  ADMINISTRADOR: 'ADMIN',
  VENDEDOR: 'VENDOR',
  COMPRADOR: 'BUYER',
};

const StatusSelect = [
  {
    key: '',
    label: 'TODOS',
  },
  {
    key: 'ENABLED',
    label: 'DISPONIBLE',
  },
  {
    key: 'DISABLED',
    label: 'INACTIVO',
  },
];

const RoleSelect = [
  {
    key: '',
    label: 'TODOS',
  },
  {
    key: 'ADMIN',
    label: 'ADMINISTRADOR',
  },
  {
    key: 'VENDOR',
    label: 'VENDEDOR',
  },
  {
    key: 'BUYER',
    label: 'COMPRADOR',
  },
];

export { Roles, StatusSelect, RoleSelect };

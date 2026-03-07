import type { WorkOrderStatus } from './work-order.model';

export interface StatusMeta {
  label: string;
  color: string;
}

export const WorkOrderStatusMeta: Record<WorkOrderStatus, StatusMeta> = {
  open: {
    label: 'Open',
    color: '$status-open'
  },
  'in-progress': {
    label: 'In Progress',
    color: '$status-in-progress'
  },
  complete: {
    label: 'Complete',
    color: '$status-complete'
  },
  blocked: {
    label: 'Blocked',
    color: '$status-blocked'
  }
};

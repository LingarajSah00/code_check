export interface NotificationTemplate {
    id: number;
    abbrName: string;
    name: string;
    status: string;
    audience_group: string;
    type: string;
    description: string;
    subject: string;
    body: string;
    availableMergeFields: Array<{
      name: string;
      tag: string;
      description: string;
    }>;
    nmCreate: string;
    dtCreate: string;
    nmUpdate: string;
    dtUpdate: string;
  }
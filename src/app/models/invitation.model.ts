// src/app/models/invitation.model.ts

export interface InvitationInfo {
    id: string;
    displayName: string;
    confirmedCount: number;
    totalTickets: number;
    allConfirmed: boolean;
}

export interface EventInfo {
    id: string;
    title: string;
    eventDate: string;
    locationName: string;
    address: string;
}

export interface Ticket {
    id: string;
    label: string;
    confirmed: boolean;
    used: boolean;
    qrPayload?: string;
}

export interface UiAction {
    primaryAction: 'CONFIRM' | 'VIEW_QRS';
    canViewConfirmedQrs: boolean;
}

export interface InvitationResponse {
    invitation: InvitationInfo;
    event: EventInfo;
    tickets: Ticket[];
    ui: UiAction;
}


export interface ConfirmResponse {
    success: boolean;
    confirmedCount: number;
}

export interface TicketQr {
    ticketId: string;
    qrDataUrl: string; // Base64 or URL
    label: string;
}

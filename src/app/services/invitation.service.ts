// src/app/services/invitation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { InvitationResponse, ConfirmResponse, TicketQr, Ticket } from '../models/invitation.model';

@Injectable({ providedIn: 'root' })
export class InvitationService {
    private base = environment.apiBaseUrl.replace(/\/+$/, '');

    constructor(private http: HttpClient) { }

    /** GET /api/public/invitations/by-token/{token} */
    getByToken(token: string): Observable<InvitationResponse> {
        return this.http.get<InvitationResponse>(
            `${this.base}/public/invitations/by-token/${token}`
        );
    }

    /** POST /api/public/invitations/confirm */
    confirmTickets(token: string, ticketIds: string[]): Observable<ConfirmResponse> {
        return this.http.post<ConfirmResponse>(
            `${this.base}/public/invitations/confirm`,
            { token, ticketIds }
        );
    }

    /** GET /api/public/tickets/by-token/{token} */
    getTicketsQr(token: string): Observable<TicketQr[]> {
        return this.http.get<InvitationResponse>(
            `${this.base}/public/tickets/by-token/${token}`
        ).pipe(
            map((res: InvitationResponse) => (res.tickets || [])
                .filter((t: Ticket) => t.confirmed && t.qrPayload)
                .map((t: Ticket) => ({
                    ticketId: t.id,
                    label: t.label,
                    qrDataUrl: t.qrPayload?.startsWith('data:')
                        ? t.qrPayload
                        : `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(t.qrPayload || '')}`
                }))
            )
        );
    }
}
